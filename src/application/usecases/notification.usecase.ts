import { isValidEmail, isValidPhoneNumber } from '@/shared/helpers/string-validator.helper'
import { NotificationTypes } from '@/domain/entities/notification.entity'
import { InvalidParamError } from '@/shared/errors'

export class NotificationUseCase {
  protected validateType (type: any, recipient: string): void {
    if (!Object.values(NotificationTypes).includes(type)) {
      throw new InvalidParamError('type')
    }

    if (!['sms', 'push', 'whatsapp', 'email'].includes(type)) {
      throw new InvalidParamError('type')
    }

    if (type === 'email' && !isValidEmail(recipient)) {
      throw new InvalidParamError('type')
    }

    if (['sms', 'push', 'whatsapp'].includes(type) && !isValidPhoneNumber(recipient)) {
      throw new InvalidParamError('type')
    }
  }

  protected validateScheduledDateHour (scheduleDateHour: Date): void {
    if (!(scheduleDateHour instanceof Date) || isNaN(scheduleDateHour.getTime()) || scheduleDateHour <= new Date()) {
      throw new InvalidParamError('scheduleDateHour')
    }
  }
}
