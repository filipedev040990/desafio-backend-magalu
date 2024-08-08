import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { NotificationEntity } from '@/domain/entities/notification.entity'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { ListNotificationScheduleUseCaseInterface } from '@/domain/interfaces/usecases/list-notification-schedule.interface'

export class ListNotificationScheduleUseCase implements ListNotificationScheduleUseCaseInterface {
  constructor (private readonly notificationRepository: NotificationRepositoryInterface) {}

  async execute (id: string): Promise<NotificationEntity | null> {
    if (!id) {
      throw new MissingParamError('id')
    }

    const existingNotification = await this.notificationRepository.getById(id)
    if (!existingNotification) {
      throw new InvalidParamError('id')
    }

    return existingNotification
  }
}
