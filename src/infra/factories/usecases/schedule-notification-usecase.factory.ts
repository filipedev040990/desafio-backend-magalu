import { ScheduleNotificationUseCase } from '@/application/usecases/schedule-notification.usecase'
import { NotificationRepository } from '@/infra/database/repositories/notification.repository'

export const makeScheduloeNotificationUseCaseFactory = (): ScheduleNotificationUseCase => {
  return new ScheduleNotificationUseCase(new NotificationRepository())
}
