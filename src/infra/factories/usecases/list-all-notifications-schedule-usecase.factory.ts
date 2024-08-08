import { ListAllNotificationsScheduleUseCase } from '@/application/usecases/list-all-notifications-schedule.usecase'
import { NotificationRepository } from '@/infra/database/repositories/notification.repository'

export const makeListAllNotificationsScheduleUseCaseFactory = (): ListAllNotificationsScheduleUseCase => {
  return new ListAllNotificationsScheduleUseCase(new NotificationRepository())
}
