<script setup lang="ts">
import { useNotificationsStore } from '../../stores/notifications'

const notificationsStore = useNotificationsStore()

onMounted(() => {
  notificationsStore.markAllAsRead()
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Powiadomienia
        </h2>

        <p class="mt-1 text-gray-500 dark:text-gray-400">
          Historia zdarzeń w systemie.
        </p>
      </div>

      <UButton
        color="error"
        :disabled="notificationsStore.notifications.length === 0"
        @click="notificationsStore.clearNotifications"
      >
        Wyczyść wszystkie
      </UButton>
    </div>

    <UCard
      v-for="notification in notificationsStore.notifications"
      :key="notification.id"
    >
      <div class="space-y-2">
        <div class="flex items-center justify-between gap-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">
            {{ notification.title }}
          </h3>

          <UBadge
            :color="notification.read ? 'neutral' : 'primary'"
            variant="subtle"
          >
            {{ notification.read ? 'Przeczytane' : 'Nowe' }}
          </UBadge>
        </div>

        <p class="text-gray-700 dark:text-gray-300">
          {{ notification.message }}
        </p>

        <p class="text-xs text-gray-500 dark:text-gray-400">
          {{ new Date(notification.createdAt).toLocaleString('pl-PL') }}
        </p>
      </div>
    </UCard>

    <UCard v-if="notificationsStore.notifications.length === 0">
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Brak powiadomień.
      </p>
    </UCard>
  </div>
</template>