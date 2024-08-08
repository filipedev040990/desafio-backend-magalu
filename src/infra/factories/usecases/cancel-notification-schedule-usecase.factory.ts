import { CancelNotificationScheduleUseCase } from '@/application/usecases/cancel-notification-schedule.usecase'
import { NotificationRepository } from '@/infra/database/repositories/notification.repository'

export const makeCancelNotificationScheduleUseCaseFactory = (): CancelNotificationScheduleUseCase => {
  return new CancelNotificationScheduleUseCase(new NotificationRepository())
}
