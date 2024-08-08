import { NotificationEntity } from '@/domain/entities/notification.entity'

export interface CancelNotificationScheduleUseCaseInterface {
  execute: (id: string) => Promise<NotificationEntity>
}
