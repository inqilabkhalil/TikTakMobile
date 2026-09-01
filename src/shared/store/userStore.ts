import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from './mmkv';
import { isLocalFileUri, resolveMediaUrl } from '../utils/mediaUrl';
import {
  INITIAL_USER_STATE,
  type PersistedUserState,
  type UserStore,
} from '../types/userStore';
import type { UserProfile } from '../types/user';

function normalizeUserForState(user: UserProfile): UserProfile {
  return { ...user, img_url: resolveMediaUrl(user?.img_url) ?? '' };
}

function stripLocalImage(user: UserProfile | null): UserProfile | null {
  if (!user) return null;
  if (!isLocalFileUri(user.img_url)) return user;
  return { ...user, img_url: '' };
}

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      ...INITIAL_USER_STATE,

      setUser: user =>
        set({
          user: normalizeUserForState(user),
          isAuthenticated: true,
          hasLoggedInBefore: true,
          error: null,
        }),

      updateUser: partial =>
        set(state => {
          if (!state.user) return { user: null };

          const next = { ...state.user, ...partial };

          return {
            user:
              partial.img_url !== undefined
                ? { ...next, img_url: resolveMediaUrl(partial.img_url) ?? '' }
                : next,
          };
        }),

      clearUser: () =>
        set({ ...INITIAL_USER_STATE, hasLoggedInBefore: true, hasHydrated: true }),

      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
          isAuthenticated: true,
          hasLoggedInBefore: true,
        }),

      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),

      setLoading: isLoading => set({ isLoading }),

      setError: error => set({ error }),

      setHasHydrated: hasHydrated => set({ hasHydrated }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
      partialize: (state): PersistedUserState => ({
        user: stripLocalImage(state.user),
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        hasLoggedInBefore: state.hasLoggedInBefore,
      }),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export const useUser = () => useUserStore(state => state.user);

export const useUserAddress = () =>
  useUserStore(state => state.user?.address ?? '');

export const useUserFullName = () =>
  useUserStore(state => state.user?.full_name ?? '');

export const useUserPhone = () =>
  useUserStore(state => state.user?.phone ?? '');

export const useIsAuthenticated = () =>
  useUserStore(state => state.isAuthenticated);

export const useHasLoggedInBefore = () =>
  useUserStore(state => state.hasLoggedInBefore);

export const useHasHydrated = () => useUserStore(state => state.hasHydrated);
