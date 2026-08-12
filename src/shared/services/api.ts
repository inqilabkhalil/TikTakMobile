import axios from 'axios';
import Config from 'react-native-config';
import { useUserStore } from '@/shared/store/userStore';

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

// TODO: login axını hazır olanda bu fallback-i sil — auth ekranları
// useUserStore.setTokens() çağıranda accessToken artıq MMKV-dən gələcək.
const TEMP_AUTH_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Iis5OTQ1MTY2Njc3NjYiLCJzdWIiOjk3LCJpYXQiOjE3ODY1MzE1OTEsImV4cCI6MTc4NjU3NDc5MX0.1GT3c2R5YbDH5GohmdCdt1KFUTvteNXrqPkTCQjqhAE';

api.interceptors.request.use(config => {
  const token = useUserStore.getState().accessToken ?? TEMP_AUTH_TOKEN;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
