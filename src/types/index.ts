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
