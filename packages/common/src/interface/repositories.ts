import {
  AuthResponse,
  ChangePassword,
  MessageResponse,
  ResetPassword,
} from './interfaces';

interface BaseRepository<T, Args> {
  findAll?: (args?: Args) => Promise<{
    items: T[];
    total: number;
    pages: number;
  }>;
  find?: (args?: Args, genericID?: string) => Promise<T>;
  save?: (args: Args) => Promise<T>;
  update?: (args?: Args, genericArgs?: Args) => Promise<T>;
  remove?: (id: string | number) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BaseAuthRepository<T, Args> {
  signup: (args: Args) => Promise<AuthResponse>;
  login?: (args: Args) => Promise<AuthResponse>;
  sendPasswordResetEmail?: (email: string) => Promise<MessageResponse>;
  resetPassword?: (args: ResetPassword) => Promise<MessageResponse>;
  changePassword?: (args: ChangePassword) => Promise<MessageResponse>;
  logout?: (refreshToken: string) => Promise<MessageResponse>;
  refreshToken?: (refreshToken: string) => Promise<AuthResponse>;
}

export type AuthRepository<T = any> = BaseAuthRepository<T, Partial<T>>;
export type UserRepository<T = any> = BaseRepository<T, Partial<T>>;
