import { NotificationEntity } from '@/domain/entities/notification.entity'

export type CreateScheduleNotificationRepositoryInput = {
  id: string
  type: string
  recipient: string
  scheduleDateHour: Date
  scheduledTime: string
  content: string
  status: string
  createdAt: Date
}

export type UpdateScheduleNotificationRepositoryInput = {
  id: string
  type?: string
  recipient?: string
  scheduleDateHour?: Date
  scheduledTime?: string
  content?: string
  updatedAt: Date
}

export interface NotificationRepositoryInterface {
  schedule: (input: CreateScheduleNotificationRepositoryInput) => Promise<NotificationEntity>
  update: (input: UpdateScheduleNotificationRepositoryInput) => Promise<NotificationEntity>
  getById: (id: string) => Promise<NotificationEntity | null>
}
