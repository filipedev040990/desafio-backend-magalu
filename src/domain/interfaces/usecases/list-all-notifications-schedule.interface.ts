import { NotificationEntity } from '@/domain/entities/notification.entity'

export interface ListALlNotificationsScheduleUseCaseInterface {
  execute: () => Promise<NotificationEntity [] | null>
}
