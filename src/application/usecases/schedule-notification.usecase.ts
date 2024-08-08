import { NotificationEntity, NotificationStatus } from '@/domain/entities/notification.entity'
import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { ScheduleNotificationInput, ScheduleNotificationUseCaseInterface } from '@/domain/interfaces/usecases/schedule-notification.interface'
import { MissingParamError } from '@/shared/errors'
import constants from '@/shared/constants'
import { randomUUID } from 'crypto'
import { NotificationUseCase } from './notification.usecase'

export class ScheduleNotificationUseCase extends NotificationUseCase implements ScheduleNotificationUseCaseInterface {
  constructor (private readonly notificationRepository: NotificationRepositoryInterface) {
    super()
  }

  async execute (input: ScheduleNotificationInput): Promise<NotificationEntity> {
    this.validateRequiredFields(input)
    this.validateType(input.type, input.recipient)

    const scheduleDateHour = this.setScheduleDateHour(new Date(input.scheduleDateHour))

    return await this.notificationRepository.schedule({
      id: randomUUID(),
      type: input.type,
      recipient: input.recipient,
      content: input.content,
      scheduleDateHour: scheduleDateHour,
      scheduledTime: this.setScheduledTime(scheduleDateHour),
      status: constants.NOTIFICATION_WAITING_STATUS as NotificationStatus,
      createdAt: new Date()
    })
  }

  validateRequiredFields (input: ScheduleNotificationInput): void {
    const requiredFields: Array<keyof ScheduleNotificationInput> = ['type', 'recipient', 'content', 'scheduleDateHour']
    for (const field of requiredFields) {
      if (!input[field]) {
        throw new MissingParamError(field)
      }
    }
  }
}
