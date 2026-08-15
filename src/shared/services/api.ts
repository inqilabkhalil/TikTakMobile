import axios from 'axios';
import Config from 'react-native-config';
import { useUserStore } from '../store/userStore';

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

if (!Config.API_URL) {
  // Helpful developer warning — do not commit .env to source control.
  // This warns when API_URL is missing locally.
  // Keep as debug-level to avoid noisy logs in production.
  console.debug('[api] API_URL is not set. Requests will be relative.');
}
api.interceptors.request.use(
  config => {
    const accessToken = useUserStore.getState().accessToken;

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => Promise.reject(error),
);