import { NotificationEntity } from '@/domain/entities/notification.entity'

export interface ListNotificationScheduleUseCaseInterface {
  execute: (id: string) => Promise<NotificationEntity>
}
