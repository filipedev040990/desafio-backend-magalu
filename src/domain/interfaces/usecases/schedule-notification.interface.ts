import { NotificationEntity, NotificationTypes } from '../entities/notification.entity'

export type ScheduleNotificationInput = {
  type: NotificationTypes
  recipient: string
  schedule_date_hour: Date
  content: string
}

export interface ScheduleNotificationUseCaseInterface {
  execute: (input: ScheduleNotificationInput) => Promise<NotificationEntity>
}
