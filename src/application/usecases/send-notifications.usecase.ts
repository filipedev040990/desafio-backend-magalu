import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { SendNotificationsUseCaseInterface } from '@/domain/interfaces/usecases/send-notifications.interface'
import { logger } from '@/shared/helpers/logger.helper'

export class SendNotificationsUseCase implements SendNotificationsUseCaseInterface {
  constructor (private readonly notificationRepository: NotificationRepositoryInterface) {}
  async execute (currentMinuteTimestamp: string): Promise<void> {
    const notifications = await this.notificationRepository.getByScheduledTime(currentMinuteTimestamp)

    if (notifications) {
      for (const notification of notifications) {
        const { id, type, recipient, content } = notification

        await this.notificationRepository.updateStatus(id, 'processing')

        const input = { type, recipient, content }

        logger.info(`Sent notitification: ${JSON.stringify(input)}`)

        await this.notificationRepository.updateStatus(id, 'sent')
      }
    }
  }
}
