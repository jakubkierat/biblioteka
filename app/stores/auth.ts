import { defineStore } from 'pinia'
import type { AuthUser, UserRole } from '../types/auth'

interface LoginCredentials {
  login: string
  password: string
}

interface AuthState {
  user: AuthUser | null
}

const users: Array<AuthUser & { password: string }> = [
  {
    login: 'user',
    password: 'user123',
    name: 'Użytkownik',
    role: 'user'
  },
  {
    login: 'admin',
    password: 'admin123',
    name: 'Administrator',
    role: 'admin'
  }
]

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null
  }),

  getters: {
    role: (state): UserRole => {
      return state.user?.role ?? 'guest'
    },

    isGuest: (state): boolean => {
      return (state.user?.role ?? 'guest') === 'guest'
    },

    isUser: (state): boolean => {
      return state.user?.role === 'user'
    },

    isAdmin: (state): boolean => {
      return state.user?.role === 'admin'
    },

    isLoggedIn: (state): boolean => {
      return state.user !== null
    }
  },

  actions: {
    login(credentials: LoginCredentials) {
      const foundUser = users.find((item) => {
        return item.login === credentials.login && item.password === credentials.password
      })

      if (!foundUser) {
        return false
      }

      this.user = {
        login: foundUser.login,
        name: foundUser.name,
        role: foundUser.role
      }

      return true
    },

    logout() {
      this.user = null
    }
  },

  persist: true
})