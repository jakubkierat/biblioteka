import { defineStore } from 'pinia'
import type {
  AppNotification,
  NotificationType
} from '../types/notification'

interface AddNotificationPayload {
  type: NotificationType
  title: string
  message: string
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as AppNotification[]
  }),

  getters: {
    unreadCount: (state) => {
      return state.notifications.filter((notification) => !notification.read).length
    }
  },

  actions: {
    addNotification(payload: AddNotificationPayload) {
      this.notifications.unshift({
        id: crypto.randomUUID(),
        type: payload.type,
        title: payload.title,
        message: payload.message,
        createdAt: new Date().toISOString(),
        read: false
      })
    },

    markAsRead(id: string) {
      const notification = this.notifications.find((item) => item.id === id)

      if (!notification) {
        return
      }

      notification.read = true
    },

    markAllAsRead() {
      this.notifications = this.notifications.map((notification) => ({
        ...notification,
        read: true
      }))
    },

    clearNotifications() {
      this.notifications = []
    }
  },

  persist: true
})