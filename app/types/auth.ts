export type UserRole = 'guest' | 'user' | 'admin'

export interface AuthUser {
  login: string
  name: string
  role: UserRole
}