export interface NotificationEntity {
  id: string
  type: NotificationTypes
  recipient: string
  scheduled_time: number
  display_time: Date
  content: string
  status: NotificationStatus
  createdAt: Date
  updatedAt: Date

}

export enum NotificationTypes {
  Email = 'email',
  Sms = 'sms',
  Push = 'push',
  Whatsapp = 'whatsapp'
}

export enum NotificationStatus {
  Waiting = 'waiting',
  Processing = 'processing',
  Sent = 'sent',
  Canceled = 'canceled'
}
