import { ListNotificationScheduleController } from '@/adapters/controllers/list-notification-schedule.controller'
import { makeListNotificationScheduleUseCaseFactory } from '../usecases/list-notification-schedule-usecase.factory'

export const makeListNotificationScheduleControllerFactory = (): ListNotificationScheduleController => {
  return new ListNotificationScheduleController(makeListNotificationScheduleUseCaseFactory())
}
