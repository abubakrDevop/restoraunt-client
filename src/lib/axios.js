import axios from 'axios';
import UserService from '../services/user.service.js';

export const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const $api = axios.create({
    baseURL: SERVER_URL, // Replace with your API endpoint
    withCredentials: true,
  })
;

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && error.config && !error._isRetry) {
    try {
      originalRequest._isRetry = true;
      const response = await UserService.verifyToken();
      localStorage.setItem('token', response.data.accessToken);
      return $api.request(originalRequest);
    } catch (e) {
      window.location.href = '/login';
      console.log('Auth error');
    }
  }
  throw error;
});
