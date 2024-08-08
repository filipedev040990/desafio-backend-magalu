import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { NotificationEntity } from '@/domain/entities/notification.entity'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { CancelNotificationScheduleUseCaseInterface } from '@/domain/interfaces/usecases/cancel-notification-schedule.interface'

export class CancelNotificationScheduleUseCase implements CancelNotificationScheduleUseCaseInterface {
  constructor (private readonly notificationRepository: NotificationRepositoryInterface) {}

  async execute (id: string): Promise<NotificationEntity> {
    if (!id) {
      throw new MissingParamError('id')
    }

    const existingNotification = await this.notificationRepository.getById(id)
    if (!existingNotification) {
      throw new InvalidParamError('id')
    }

    if (existingNotification.status !== 'waiting') {
      throw new InvalidParamError('Only notifications with waiting status can be canceled')
    }

    return await this.notificationRepository.cancel(id)
  }
}
