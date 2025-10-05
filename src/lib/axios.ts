import axios from 'axios';

const api = axios.create({
  baseURL: '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: request interceptor
api.interceptors.request.use(
  config => {
    // Add auth token from cookie or localStorage if needed
    // const token = localStorage.getItem('token');
    // if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    // Handle global errors here
    console.error('API Error:', error.response?.data || error.message);

    return Promise.reject(error);
  }
);

export default api;
