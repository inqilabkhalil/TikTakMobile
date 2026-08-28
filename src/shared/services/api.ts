import axios from 'axios';
import Config from 'react-native-config';
import { useUserStore } from '../store/userStore';

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    const accessToken = useUserStore.getState().accessToken;

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.data instanceof FormData) {
      config.timeout = 60000;
      delete config.headers['Content-Type'];
      config.transformRequest = [(data) => data];
    }

    return config;
  },
  error => Promise.reject(error),
);