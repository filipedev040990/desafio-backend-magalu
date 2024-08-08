import { NotificationEntity } from '@/domain/entities/notification.entity'

export interface ListAllNotificationsScheduleUseCaseInterface {
  execute: () => Promise<NotificationEntity [] | null>
}
