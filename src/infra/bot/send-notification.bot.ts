import { SendNotificationsUseCase } from '@/application/usecases/send-notifications.usecase'
import schedule from 'node-schedule'
import { NotificationRepository } from '../database/repositories/notification.repository'

export const sendNotifications = async (): Promise<void> => {
  schedule.scheduleJob('*/1 * * * *', async () => {
    const currentMinuteTimestamp = getCurrentMinuteTimestamp()
    const sendNotificationUseCase = new SendNotificationsUseCase(new NotificationRepository())
    await sendNotificationUseCase.execute(currentMinuteTimestamp)
  })
}

const getCurrentMinuteTimestamp = (): string => {
  const now = new Date()
  now.setSeconds(0)
  now.setMilliseconds(0)
  return now.getTime().toString()
}
