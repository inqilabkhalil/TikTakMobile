// src/app/storage/authStorage.ts

import { storage } from "../store";
import { STORAGE_KEYS } from "./keys";


export const authStorage = {
  saveAccessToken(token: string) {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  getAccessToken() {
    return storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
  },

  saveRefreshToken(token: string) {
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  getRefreshToken() {
    return storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
  },

  saveUser(user: unknown) {
    storage.set(
      STORAGE_KEYS.USER,
      JSON.stringify(user),
    );
  },

  getUser<T>() {
    const user = storage.getString(STORAGE_KEYS.USER);

    return user ? (JSON.parse(user) as T) : null;
  },

  clear() {
    storage.delete(STORAGE_KEYS.ACCESS_TOKEN);
    storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
    storage.delete(STORAGE_KEYS.USER);
  },
};