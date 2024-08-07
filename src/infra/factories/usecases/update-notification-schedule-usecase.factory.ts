import { UpdateNotificationScheduleUseCase } from '@/application/usecases/update-notification-schedule.usecase'
import { NotificationRepository } from '@/infra/database/repositories/notification.repository'

export const makeUpdateNotificationScheduleUseCaseFactory = (): UpdateNotificationScheduleUseCase => {
  return new UpdateNotificationScheduleUseCase(new NotificationRepository())
}
