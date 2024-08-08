import { UpdateNotificationScheduleController } from '@/adapters/controllers/update-notification-schedule.controller'
import { makeUpdateNotificationScheduleUseCaseFactory } from '../usecases/update-notification-schedule-usecase.factory'

export const makeUpdateNotificationScheduleControllerFactory = (): UpdateNotificationScheduleController => {
  return new UpdateNotificationScheduleController(makeUpdateNotificationScheduleUseCaseFactory())
}
