import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from './mmkv';
import {
  INITIAL_USER_STATE,
  type PersistedUserState,
  type UserStore,
} from '../types/userStore';

export const useUserStore = create<UserStore>()(
  persist(
    set => ({
      ...INITIAL_USER_STATE,

      setUser: user =>
        set({
          user,
          isAuthenticated: true,
          hasLoggedInBefore: true,
          error: null,
        }),

      updateUser: partial =>
        set(state => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),

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
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        hasLoggedInBefore: state.hasLoggedInBefore,
      }),
      onRehydrateStorage: () => state => {
        // Runs after MMKV state has been merged in, regardless of success/failure —
        // navigation must not decide Main vs Auth before this fires (see RootNavigator).
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
