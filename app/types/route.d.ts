import type { UserRole } from './auth'

declare module '#app' {
  interface PageMeta {
    roles?: UserRole[]
  }
}

export {}