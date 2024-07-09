export interface AppState {
  user: {
    accessToken: string;
    isAdmin: boolean;
    refreshToken: string;
    username: string;
  } | null;
  username: string;
  password: string;
  success: boolean;
  error: boolean;
}

export interface UserResponse {
  username: string;
  isAdmin: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
