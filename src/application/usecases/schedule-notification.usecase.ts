import { NotificationEntity, NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { ScheduleNotificationInput, ScheduleNotificationUseCaseInterface } from '@/domain/interfaces/usecases/schedule-notification.interface'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import constants from '@/shared/constants'
import { randomUUID } from 'crypto'

export class ScheduleNotificationUseCase implements ScheduleNotificationUseCaseInterface {
  constructor (private readonly notificationRepository: NotificationRepositoryInterface) {}
  async execute (input: ScheduleNotificationInput): Promise<NotificationEntity> {
    this.validateRequiredFields(input)
    this.validateType(input.type)
    this.validateScheduledDateHour(input.schedule_date_hour)

    return await this.notificationRepository.schedule({
      id: randomUUID(),
      type: input.type,
      recipient: input.recipient,
      content: input.content,
      schedule_date_hour: input.schedule_date_hour,
      scheduled_time: input.schedule_date_hour.getTime(),
      status: constants.NOTIFICATION_WAITING_STATUS as NotificationStatus,
      createdAt: new Date()
    })
  }

  validateRequiredFields (input: ScheduleNotificationInput): void {
    const requiredFields: Array<keyof ScheduleNotificationInput> = ['type', 'recipient', 'content', 'schedule_date_hour']
    for (const field of requiredFields) {
      if (!input[field]) {
        throw new MissingParamError(field)
      }
    }
  }

  validateType (type: any): void {
    if (!Object.values(NotificationTypes).includes(type)) {
      throw new InvalidParamError('type')
    }
  }

  validateScheduledDateHour (scheduleDateHour: Date): void {
    scheduleDateHour = new Date(scheduleDateHour)
    if (isNaN(scheduleDateHour.getTime()) || scheduleDateHour < new Date()) {
      throw new InvalidParamError('schedule_date_hour')
    }
  }
}
