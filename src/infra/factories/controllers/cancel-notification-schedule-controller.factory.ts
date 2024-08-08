import { CancelNotificationScheduleController } from '@/adapters/controllers/cancel-notification-schedule.controller'
import { makeCancelNotificationScheduleUseCaseFactory } from '../usecases/cancel-notification-schedule-usecase.factory'

export const makeCancelNotificationScheduleControllerFactory = (): CancelNotificationScheduleController => {
  return new CancelNotificationScheduleController(makeCancelNotificationScheduleUseCaseFactory())
}
