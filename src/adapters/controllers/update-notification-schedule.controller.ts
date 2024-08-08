import { UpdateNotificationScheduleUseCaseInterface } from '@/domain/interfaces/usecases/update-notification-schedule.interface'
import { ControllerInterface } from '@/domain/interfaces/controllers/controllers.interface'
import { HttpRequest, HttpResponse } from '@/shared/types'
import { handleError } from '@/shared/helpers/error.helper'
import { success } from '@/shared/helpers/http.helper'

export class UpdateNotificationScheduleController implements ControllerInterface {
  constructor (private readonly usecase: UpdateNotificationScheduleUseCaseInterface) {}
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.usecase.execute({ id: input?.params?.id, ...input?.body })
      return success(200, output)
    } catch (error) {
      return handleError(error)
    }
  }
}
