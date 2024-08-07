import { ScheduleNotificationInput } from '@/domain/interfaces/usecases/schedule-notification.interface'
import { ScheduleNotificationUseCase } from './schedule-notification.usecase'
import { NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { MissingParamError } from '@/shared/errors'
import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'anyId')
}))

const notificationRepository = mock<NotificationRepositoryInterface>()

describe('ScheduleNotificationUseCase', () => {
  let sut: ScheduleNotificationUseCase
  let input: ScheduleNotificationInput
  let now: Date

  beforeEach(() => {
    sut = new ScheduleNotificationUseCase(notificationRepository)
    now = new Date()
    now.setHours(now.getHours() + 5)
    input = {
      type: 'whatsapp' as NotificationTypes,
      recipient: '32999895632',
      content: 'AnyContent',
      scheduleDateHour: now
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throws if a any required field is not provided', async () => {
    const requiredFields: Array<keyof ScheduleNotificationInput> = ['type', 'recipient', 'content', 'scheduleDateHour']
    for (const field of requiredFields) {
      input[field] = undefined as any
      const promise = sut.execute(input)
      await expect(promise).rejects.toThrowError(new MissingParamError(field))
      input[field] = field as any
    }
  })

  test('should call NotificationRepository.schedule once and with correct values', async () => {
    const scheduleDateHour = now
    const scheduledTime = scheduleDateHour.getTime().toString()
    await sut.execute(input)
    expect(notificationRepository.schedule).toHaveBeenCalledTimes(1)
    expect(notificationRepository.schedule).toHaveBeenCalledWith({
      id: 'anyId',
      type: 'whatsapp',
      recipient: '32999895632',
      scheduledTime: scheduledTime,
      scheduleDateHour: scheduleDateHour,
      content: 'AnyContent',
      status: 'waiting',
      createdAt: new Date()
    })
  })

  test('should return a correct output', async () => {
    const scheduleDateHour = new Date()
    const scheduledTime = scheduleDateHour.getTime()
    const notification = {
      id: 'anyId',
      type: 'whatsapp' as NotificationTypes,
      recipient: '32999895632',
      scheduledTime: scheduledTime,
      scheduleDateHour: scheduleDateHour,
      content: 'AnyContent',
      status: 'waiting' as NotificationStatus,
      createdAt: new Date()
    }
    notificationRepository.schedule.mockResolvedValue(notification)
    const output = await sut.execute(input)
    expect(output).toEqual(notification)
  })
})
