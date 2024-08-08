import { mock } from 'jest-mock-extended'
import { SendNotificationsUseCase } from './send-notifications.usecase'
import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { NotificationTypes, NotificationStatus } from '@/domain/entities/notification.entity'

const notificationRepository = mock<NotificationRepositoryInterface>()
const fakeNotifications = [{
  id: 'anyId',
  type: 'whatsapp' as NotificationTypes,
  recipient: 'anyRecipient',
  scheduledTime: 123456789,
  scheduleDateHour: new Date('2024-08-08 15:00:00'),
  content: 'AnyContent',
  status: 'waiting' as NotificationStatus,
  createdAt: new Date(),
  updatedAt: new Date()
}, {
  id: 'anotherId',
  type: 'whatsapp' as NotificationTypes,
  recipient: 'anotherRecipient',
  scheduledTime: 123456789,
  scheduleDateHour: new Date('2024-08-08 15:00:00'),
  content: 'anotherContent',
  status: 'waiting' as NotificationStatus,
  createdAt: new Date(),
  updatedAt: new Date()
}]

describe('SendNotificationsUseCase', () => {
  let sut: SendNotificationsUseCase
  let currentMinuteTimestamp: string

  beforeEach(() => {
    sut = new SendNotificationsUseCase(notificationRepository)
    currentMinuteTimestamp = '123456789'
    notificationRepository.getByScheduledTime.mockResolvedValue(fakeNotifications)
  })

  test('should call NotificationRepository.getByScheduledTime once and with correct value', async () => {
    await sut.execute(currentMinuteTimestamp)
    expect(notificationRepository.getByScheduledTime).toHaveBeenCalledTimes(1)
    expect(notificationRepository.getByScheduledTime).toHaveBeenCalledWith('123456789')
  })

  test('should not call NotificationRepository.updateStatus if NotificationRepository.getByScheduledTime returns null', async () => {
    notificationRepository.getByScheduledTime.mockResolvedValueOnce(null)
    await sut.execute(currentMinuteTimestamp)
    expect(notificationRepository.updateStatus).toHaveBeenCalledTimes(0)
  })

  test('should not call NotificationRepository.updateStatus', async () => {
    await sut.execute(currentMinuteTimestamp)
    expect(notificationRepository.updateStatus).toHaveBeenCalledTimes(4)
  })
})
