import { UserProfile } from './user';

export interface RegisterRequest {
  full_name: string;
  phone: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthApiData {
  tokens: AuthTokens;
  profile: UserProfile;
}

export interface AuthApiResponse {
  message: string;
  data: AuthApiData;
  result: boolean;
}

export interface AuthResult {
  tokens?: AuthTokens;
  profile?: UserProfile | null;
}
