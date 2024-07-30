import { NotificationEntity } from '@/domain/entities/notification.entity'

export type ScheduleNotificationRepositoryInput = {
  id: string
  type: string
  recipient: string
  schedule_date_hour: Date
  scheduled_time: number
  content: string
  status: string
  createdAt: Date
}

export interface NotificationRepositoryInterface {
  schedule: (input: ScheduleNotificationRepositoryInput) => Promise<NotificationEntity>
}
