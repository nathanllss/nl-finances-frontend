export interface LoginRequest {
  login: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
}
