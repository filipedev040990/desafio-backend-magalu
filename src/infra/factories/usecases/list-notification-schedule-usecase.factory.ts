import { ListNotificationScheduleUseCase } from '@/application/usecases/list-notification-schedule.usecase'
import { NotificationRepository } from '@/infra/database/repositories/notification.repository'

export const makeListNotificationScheduleUseCaseFactory = (): ListNotificationScheduleUseCase => {
  return new ListNotificationScheduleUseCase(new NotificationRepository())
}
