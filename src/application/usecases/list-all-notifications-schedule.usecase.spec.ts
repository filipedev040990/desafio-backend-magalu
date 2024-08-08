import { NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { ListAllNotificationsScheduleUseCase } from './list-all-notifications-schedule.usecase'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'

const notificationRepository = mock<NotificationRepositoryInterface>()

const scheduleDateHour = new Date()
const scheduledTime = scheduleDateHour.getTime()
const fakeNotifications = [{
  id: 'anyId',
  type: 'whatsapp' as NotificationTypes,
  recipient: 'anyRecipient',
  scheduledTime: scheduledTime,
  scheduleDateHour: scheduleDateHour,
  content: 'AnyContent',
  status: 'waiting' as NotificationStatus,
  createdAt: new Date(),
  updatedAt: new Date()
}]

describe('ListAllNotificationsScheduleUseCase', () => {
  let sut: ListAllNotificationsScheduleUseCase
  let now: Date

  beforeEach(() => {
    sut = new ListAllNotificationsScheduleUseCase(notificationRepository)
    now = new Date()
    now.setHours(now.getHours() + 5)
    notificationRepository.listAll.mockResolvedValue(fakeNotifications)
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call NotificationRepository.listAll once and with correct values', async () => {
    await sut.execute()
    expect(notificationRepository.listAll).toHaveBeenCalledTimes(1)
  })

  test('should return a correct output', async () => {
    const output = await sut.execute()
    expect(output).toEqual(fakeNotifications)
  })
})
