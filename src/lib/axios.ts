import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { backendUrl } from '@/constants';

// --- Public Axios instance (no token required) ---
export const axiosPublic = axios.create({
  baseURL: backendUrl,
  headers: { 'Content-Type': 'application/json' },
});

// --- Protected Axios instance (with token handling) ---
export const axiosProtected = axios.create({
  baseURL: backendUrl,
  headers: { 'Content-Type': 'application/json' },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (_token: string) => void;
  reject: (_err: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  for (const p of failedQueue) {
    if (token) p.resolve(token);
    else p.reject(error);
  }
  failedQueue = [];
};

// Request interceptor
axiosProtected.interceptors.request.use(config => {
  const accessToken = getCookie('accessToken') as string | undefined;

  if (accessToken && config.headers) {
    //eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Response interceptor
axiosProtected.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    //eslint-disable-next-line no-underscore-dangle
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(axiosProtected(originalRequest));
            },
            reject: (err: unknown) => {
              reject(err);
            },
          });
        });
      }
      // eslint-disable-next-line no-underscore-dangle
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getCookie('refreshToken') as string | undefined;

        if (!refreshToken) throw new Error('No refresh token');

        const response = await axiosPublic.get('/api/v1/refreshToken', {
          params: { token: refreshToken },
          headers: { Authorization: `Bearer ${refreshToken}` },
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        setCookie('accessToken', accessToken, { path: '/', maxAge: 60 * 15 });
        setCookie('refreshToken', newRefreshToken, { path: '/', maxAge: 60 * 15 });

        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosProtected(originalRequest);
      } catch (error_) {
        processQueue(error_, null);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        // await logout({});

        // eslint-disable-next-line unicorn/no-useless-promise-resolve-reject
        return Promise.reject(error_);
      } finally {
        isRefreshing = false;
      }
    }

    throw error;
  }
);
