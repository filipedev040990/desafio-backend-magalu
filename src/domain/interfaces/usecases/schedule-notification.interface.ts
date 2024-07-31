import { NotificationEntity, NotificationTypes } from '@/domain/entities/notification.entity'

export type ScheduleNotificationInput = {
  type: NotificationTypes
  recipient: string
  scheduleDateHour: Date
  content: string
}

export interface ScheduleNotificationUseCaseInterface {
  execute: (input: ScheduleNotificationInput) => Promise<NotificationEntity>
}
