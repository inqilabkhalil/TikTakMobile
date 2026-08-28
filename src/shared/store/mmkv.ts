import { NativeModules } from 'react-native';
import { MMKV } from 'react-native-mmkv';

type MMKVNativeModule = {
  install?: (rootDirectory: string | null) => boolean;
};

let jsiBindingsInstallAttempted = false;

function installMMKVJSIBindings(): void {
  if (jsiBindingsInstallAttempted) return;
  jsiBindingsInstallAttempted = true;

  const nativeMMKV = NativeModules.MMKV as MMKVNativeModule | undefined;
  try {
    nativeMMKV?.install?.(null);
  } catch {
  }
}

let storageInstance: MMKV | null = null;
const _memoryStore = new Map<string, string>();

function getStorage(): MMKV | null {
  if (storageInstance) return storageInstance;
  try {
    installMMKVJSIBindings();
    storageInstance = new MMKV({ id: 'tiktak-storage' });
    return storageInstance;
  } catch {
    return null;
  }
}

export const zustandMMKVStorage = {
  setItem: (name: string, value: string) => {
    const s = getStorage();
    if (s) s.set(name, value);
    else _memoryStore.set(name, value);
  },
  getItem: (name: string): string | null => {
    const s = getStorage();
    if (s) return s.getString(name) ?? null;
    return _memoryStore.get(name) ?? null;
  },
  removeItem: (name: string) => {
    const s = getStorage();
    if (s) s.delete(name);
    else _memoryStore.delete(name);
  },
};

export const storage = {
  set: (key: string, value: string | number | boolean) => {
    const s = getStorage();
    if (s) return s.set(key, value);
    _memoryStore.set(key, String(value));
    return undefined;
  },
  getString: (key: string) => {
    const s = getStorage();
    if (s) return s.getString(key);
    return _memoryStore.get(key) ?? undefined;
  },
  getNumber: (key: string) => {
    const s = getStorage();
    if (s) return s.getNumber(key);
    const v = _memoryStore.get(key);
    return v ? Number(v) : undefined;
  },
  getBoolean: (key: string) => {
    const s = getStorage();
    if (s) return s.getBoolean(key);
    const v = _memoryStore.get(key);
    return v ? v === 'true' : undefined;
  },
  delete: (key: string) => {
    const s = getStorage();
    if (s) s.delete(key);
    else _memoryStore.delete(key);
  },
  clearAll: () => {
    const s = getStorage();
    if (s) s.clearAll();
    else _memoryStore.clear();
  },
};