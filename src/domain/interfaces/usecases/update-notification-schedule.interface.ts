import { NotificationEntity, NotificationTypes } from '@/domain/entities/notification.entity'

export type UpdateNotificationScheduleInput = {
  id: string
  type: NotificationTypes
  recipient: string
  scheduleDateHour: Date
  content: string
}

export interface UpdateNotificationScheduleUseCaseInterface {
  execute: (input: UpdateNotificationScheduleInput) => Promise<NotificationEntity>
}
