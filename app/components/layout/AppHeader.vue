<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'
import { useNotificationsStore } from '../../stores/notifications'

const authStore = useAuthStore()
const notificationsStore = useNotificationsStore()

const roleLabel = computed(() => {
  if (authStore.isAdmin) {
    return 'Administrator'
  }

  if (authStore.isUser) {
    return 'Użytkownik'
  }

  return 'Gość'
})
</script>

<template>
  <header class="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
    <div class="flex h-16 items-center justify-between px-6">
      <NuxtLink to="/" class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white">
          B
        </div>

        <div>
          <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
            Biblioteka
          </h1>

          <p class="text-sm text-gray-500 dark:text-gray-400">
            System zarządzania katalogiem książek
          </p>
        </div>
      </NuxtLink>

      <div class="flex items-center gap-3">
        <UBadge color="primary" variant="subtle">
          {{ roleLabel }}
        </UBadge>

        <UButton
          icon="i-heroicons-bell"
          color="neutral"
          variant="outline"
          to="/notifications"
        >
          {{ notificationsStore.unreadCount }}
        </UButton>

        <UButton
          v-if="authStore.isAdmin"
          icon="i-heroicons-plus"
          color="primary"
          variant="solid"
          to="/books/create"
        >
          Dodaj książkę
        </UButton>

        <UButton
          v-if="authStore.isLoggedIn"
          color="neutral"
          variant="outline"
          @click="authStore.logout"
        >
          Wyloguj
        </UButton>

        <UButton
          v-else
          color="primary"
          variant="outline"
          to="/login"
        >
          Zaloguj
        </UButton>
      </div>
    </div>
  </header>
</template>