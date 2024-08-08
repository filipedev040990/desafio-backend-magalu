import { ListAllNotificationsScheduleController } from '@/adapters/controllers/list-all-notifications-schedule.controller'
import { makeListAllNotificationsScheduleUseCaseFactory } from '../usecases/list-all-notifications-schedule-usecase.factory'

export const makeListAllNotificationsScheduleControllerFactory = (): ListAllNotificationsScheduleController => {
  return new ListAllNotificationsScheduleController(makeListAllNotificationsScheduleUseCaseFactory())
}
