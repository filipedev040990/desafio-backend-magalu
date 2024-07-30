import { NotificationEntity } from '@/domain/entities/notification.entity'

export type ScheduleNotificationRepositoryInput = {
  id: string
  type: string
  recipient: string
  scheduleDateHour: Date
  scheduledTime: number
  content: string
  status: string
  createdAt: Date
}

export interface NotificationRepositoryInterface {
  schedule: (input: ScheduleNotificationRepositoryInput) => Promise<NotificationEntity>
}
