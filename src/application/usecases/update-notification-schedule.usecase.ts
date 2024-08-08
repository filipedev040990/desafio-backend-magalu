import { UpdateNotificationScheduleInput, UpdateNotificationScheduleUseCaseInterface } from '@/domain/interfaces/usecases/update-notification-schedule.interface'
import { NotificationRepositoryInterface, UpdateScheduleNotificationRepositoryInput } from '@/domain/interfaces/repositories/notification.repository.interface'
import { NotificationEntity } from '@/domain/entities/notification.entity'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { NotificationUseCase } from './notification.usecase'

export class UpdateNotificationScheduleUseCase extends NotificationUseCase implements UpdateNotificationScheduleUseCaseInterface {
  constructor (private readonly notificationRepository: NotificationRepositoryInterface) {
    super()
  }

  async execute (input: UpdateNotificationScheduleInput): Promise<NotificationEntity> {
    if (!input.id) {
      throw new MissingParamError('id')
    }

    const existingNotification = await this.notificationRepository.getById(input.id)
    if (!existingNotification) {
      throw new InvalidParamError('id')
    }

    if (existingNotification.status !== 'waiting') {
      throw new InvalidParamError('Only notifications with waiting status can be updated')
    }

    if (input.type || input.recipient) {
      const type = input?.type ?? existingNotification.type
      const recipient = input?.recipient ?? existingNotification.recipient
      this.validateType(type, recipient)
    }

    const updatedFields: UpdateScheduleNotificationRepositoryInput = {
      id: input.id,
      type: input?.type,
      recipient: input?.recipient,
      content: input?.content,
      updatedAt: new Date()
    }

    if (input.scheduleDateHour) {
      const scheduleDateHour = new Date(input.scheduleDateHour)

      this.validateScheduledDateHour(scheduleDateHour)

      Object.assign(updatedFields, {
        scheduleDateHour: scheduleDateHour,
        scheduledTime: scheduleDateHour.getTime().toString()
      })
    }

    return await this.notificationRepository.update(updatedFields)
  }
}
