import { ScheduleNotificationController } from '@/adapters/controllers/schedule-notification.controller'
import { makeScheduloeNotificationUseCaseFactory } from '../usecases/schedule-notification-usecase.factory'

export const makeScheduleNotificationControllerFactory = (): ScheduleNotificationController => {
  return new ScheduleNotificationController(makeScheduloeNotificationUseCaseFactory())
}
