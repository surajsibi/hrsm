'use client';

import { useEffect } from 'react';

import { getCookie } from 'cookies-next';

import { axiosProtected } from '@/lib/axios';

import type { AxiosInstance } from 'axios';

// React hook to ensure the protected Axios instance always attaches tokens
export const useAxiosAuth = (): AxiosInstance => {
  useEffect(() => {
    const requestInterceptor = axiosProtected.interceptors.request.use(
      config => {
        const token = getCookie('accessToken');

        if (token && !config.headers.Authorization) {
          //eslint-disable-next-line no-param-reassign
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      async error => {
        throw error;
      }
    );

    return () => {
      axiosProtected.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosProtected;
};

export default useAxiosAuth;
