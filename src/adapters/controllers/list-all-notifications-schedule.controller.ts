import { ListAllNotificationsScheduleUseCaseInterface } from '@/domain/interfaces/usecases/list-all-notifications-schedule.interface'
import { ControllerInterface } from '@/domain/interfaces/controllers/controllers.interface'
import { HttpResponse } from '@/shared/types'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class ListAllNotificationsScheduleController implements ControllerInterface {
  constructor (private readonly usecase: ListAllNotificationsScheduleUseCaseInterface) {}
  async execute (): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute()
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
