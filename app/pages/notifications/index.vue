<script setup lang="ts">
import { useNotificationsStore } from '../../stores/notifications'

const notificationsStore = useNotificationsStore()
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
        <h3 class="font-semibold">
          {{ notification.title }}
        </h3>

        <p>
          {{ notification.message }}
        </p>

        <p class="text-xs text-gray-500">
          {{ new Date(notification.createdAt).toLocaleString('pl-PL') }}
        </p>
      </div>
    </UCard>

    <UCard
      v-if="notificationsStore.notifications.length === 0"
    >
      Brak powiadomień.
    </UCard>
  </div>
</template>