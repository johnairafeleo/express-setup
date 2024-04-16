export interface AuthResponse {
  userId?: string;
  accessToken?: string;
  refreshToken?: string;
  success?: boolean;
  error?: string;
}
export interface MessageResponse {
  success?: boolean;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface ResetPassword {
  confirmPassword: string;
  password: string;
  token: string;
  email: string;
}

export interface ChangePassword {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
  userId?: string;
  email?: string;
}
