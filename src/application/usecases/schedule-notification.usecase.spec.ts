import { ScheduleNotificationInput } from '@/domain/interfaces/usecases/schedule-notification.interface'
import { ScheduleNotificationUseCase } from './schedule-notification.usecase'
import { NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
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

  beforeEach(() => {
    sut = new ScheduleNotificationUseCase(notificationRepository)
    input = {
      type: 'whatsapp' as NotificationTypes,
      recipient: 'anyRecipient',
      content: 'AnyContent',
      schedule_date_hour: new Date()
    }
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throws if a any required field is not provided', async () => {
    const requiredFields: Array<keyof ScheduleNotificationInput> = ['type', 'recipient', 'content', 'schedule_date_hour']
    for (const field of requiredFields) {
      input[field] = undefined as any
      const promise = sut.execute(input)
      await expect(promise).rejects.toThrowError(new MissingParamError(field))
      input[field] = field as any
    }
  })

  test('should throws if a invalid type is provided', async () => {
    input.type = 'invalid_type' as any
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError(new InvalidParamError('type'))
  })

  test('should throws if a invalid schedule_date_hour is provided', async () => {
    input.schedule_date_hour = 'invalid_date' as any
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError(new InvalidParamError('schedule_date_hour'))
  })

  test('should throws if a invalid schedule_date_hour is provided', async () => {
    input.schedule_date_hour = '1990-01-01 00:00:00' as any
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError(new InvalidParamError('schedule_date_hour'))
  })

  test('should call NotificationRepository.schedule once and with correct values', async () => {
    const scheduleDateHour = new Date()
    const scheduledTime = scheduleDateHour.getTime()
    await sut.execute(input)
    expect(notificationRepository.schedule).toHaveBeenCalledTimes(1)
    expect(notificationRepository.schedule).toHaveBeenCalledWith({
      id: 'anyId',
      type: 'whatsapp',
      recipient: 'anyRecipient',
      scheduled_time: scheduledTime,
      schedule_date_hour: scheduleDateHour,
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
      recipient: 'anyRecipient',
      scheduled_time: scheduledTime,
      schedule_date_hour: scheduleDateHour,
      content: 'AnyContent',
      status: 'waiting' as NotificationStatus,
      createdAt: new Date()
    }
    notificationRepository.schedule.mockResolvedValue(notification)
    const output = await sut.execute(input)
    expect(output).toEqual(notification)
  })
})
