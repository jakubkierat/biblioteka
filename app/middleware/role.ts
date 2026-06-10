import { useAuthStore } from '../stores/auth'
import type { UserRole } from '../types/auth'

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  const allowedRoles = to.meta.roles as UserRole[] | undefined

  if (!allowedRoles) {
    return
  }

  if (allowedRoles.includes(authStore.role)) {
    return
  }

  return abortNavigation(
    createError({
      statusCode: 403,
      statusMessage: 'Brak dostępu'
    })
  )
})