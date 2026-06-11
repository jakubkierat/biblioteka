export type NotificationType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  message: string
  createdAt: string
  read: boolean
}