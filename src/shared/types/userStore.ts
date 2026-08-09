import { UserProfile } from './user';

export interface UserState {
  user: UserProfile | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserActions {
  setUser: (user: UserProfile) => void;
  updateUser: (partial: Partial<UserProfile>) => void;
  clearUser: () => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export type UserStore = UserState & UserActions;

export type PersistedUserState = Pick<
  UserState,
  'user' | 'accessToken' | 'refreshToken' | 'isAuthenticated'
>;

export const INITIAL_USER_STATE: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
