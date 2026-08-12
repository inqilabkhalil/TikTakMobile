import { MMKV } from 'react-native-mmkv';

let storageInstance: MMKV | null = null;

function getStorage(): MMKV | null {
  if (storageInstance) return storageInstance;
  try {
    storageInstance = new MMKV({ id: 'tiktak-storage' });
    return storageInstance;
  } catch (error) {
    console.warn('[MMKV] Initialization failed:', error);
    return null;
  }
}

export const zustandMMKVStorage = {
  setItem: (name: string, value: string) => {
    getStorage()?.set(name, value);
  },
  getItem: (name: string): string | null => {
    return getStorage()?.getString(name) ?? null;
  },
  removeItem: (name: string) => {
    getStorage()?.delete(name);
  },
};

export const storage = {
  set: (key: string, value: string | number | boolean) =>
  getStorage()?.set(key, value),
  getString: (key: string) => getStorage()?.getString(key),
  getNumber: (key: string) => getStorage()?.getNumber(key),
  getBoolean: (key: string) => getStorage()?.getBoolean(key),
  delete: (key: string) => getStorage()?.delete(key),
  clearAll: () => getStorage()?.clearAll(),
};