export interface User {
  id: number;
  username: string;
  email: string;
  learningPreferences?: unknown;
  lastActivity?: Date | null;
  role?: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  lastLogin: Date;
  createdAt: Date;
}

export type AuthUser = User | AdminUser;

export function isAdminUser(user: AuthUser): user is AdminUser {
  return 'role' in user && user.role === 'admin';
}
