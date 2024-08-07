import { ControllerInterface } from '@/domain/interfaces/controllers/controllers.interface'
import { ScheduleNotificationUseCaseInterface } from '@/domain/interfaces/usecases/schedule-notification.interface'
import { success } from '@/shared/helpers/http.helper'
import { HttpRequest, HttpResponse } from '@/shared/types'
import { handleError } from '@/shared/helpers/error.helper'

export class ScheduleNotificationController implements ControllerInterface {
  constructor (private readonly usecase: ScheduleNotificationUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.body)
      return success(201, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
