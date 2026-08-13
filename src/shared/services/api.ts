import axios from 'axios';
import Config from 'react-native-config';
import { useUserStore } from '../store/userStore';

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

console.log('API BASE URL:', Config.API_URL);

api.interceptors.request.use(
  config => {
    const accessToken =
      useUserStore.getState().accessToken ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQ1MTY2Njc3NjYiLCJzdWIiOjk3LCJpYXQiOjE3ODY2MjM1MjcsImV4cCI6MTc4NjY2NjcyN30.5-A9fGbVPlu9ldu-tZgJu9BRV4kpqL7YKiLxniyxHAU';

    console.log('API REQUEST:', config.method, config.url);
    console.log('HAS ACCESS TOKEN:', !!accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);
