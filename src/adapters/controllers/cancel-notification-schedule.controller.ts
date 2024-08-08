import { CancelNotificationScheduleUseCaseInterface } from '@/domain/interfaces/usecases/cancel-notification-schedule.interface'
import { ControllerInterface } from '@/domain/interfaces/controllers/controllers.interface'
import { HttpRequest, HttpResponse } from '@/shared/types'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class CancelNotificationScheduleController implements ControllerInterface {
  constructor (private readonly usecase: CancelNotificationScheduleUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute(input?.params?.id)
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
