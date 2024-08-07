import { NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { UpdateNotificationScheduleUseCase } from './update-notification-schedule.usecase'
import { UpdateNotificationScheduleInput } from '@/domain/interfaces/usecases/update-notification-schedule.interface'
import MockDate from 'mockdate'
import { mock } from 'jest-mock-extended'

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => 'anyId')
}))

const notificationRepository = mock<NotificationRepositoryInterface>()

const scheduleDateHour = new Date()
const scheduledTime = scheduleDateHour.getTime()
const fakeNotification = {
  id: 'anyId',
  type: 'whatsapp' as NotificationTypes,
  recipient: 'anyRecipient',
  scheduledTime: scheduledTime,
  scheduleDateHour: scheduleDateHour,
  content: 'AnyContent',
  status: 'waiting' as NotificationStatus,
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('UpdateNotificationScheduleUseCase', () => {
  let sut: UpdateNotificationScheduleUseCase
  let input: UpdateNotificationScheduleInput
  let now: Date

  beforeEach(() => {
    sut = new UpdateNotificationScheduleUseCase(notificationRepository)
    now = new Date()
    now.setHours(now.getHours() + 5)
    input = {
      id: 'anyId',
      type: 'email' as NotificationTypes,
      recipient: 'anyEmail@gmail.com',
      content: 'AnyContent',
      scheduleDateHour: now
    }

    notificationRepository.getById.mockResolvedValue(fakeNotification)
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throws if id is not provided', async () => {
    input.id = undefined as any
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError(new MissingParamError('id'))
  })

  test('should throws if NotificationRepository.getById once and with correct values', async () => {
    await sut.execute(input)
    expect(notificationRepository.getById).toHaveBeenCalledTimes(1)
    expect(notificationRepository.getById).toHaveBeenCalledWith('anyId')
  })

  test('should throws if NotificationRepository.getById returns null', async () => {
    notificationRepository.getById.mockResolvedValueOnce(null)
    const promise = sut.execute(input)
    await expect(promise).rejects.toThrowError(new InvalidParamError('id'))
  })

  test('should call NotificationRepository.update once and with correct values', async () => {
    const scheduleDateHour = now
    const scheduledTime = scheduleDateHour.getTime().toString()
    await sut.execute(input)
    expect(notificationRepository.update).toHaveBeenCalledTimes(1)
    expect(notificationRepository.update).toHaveBeenCalledWith({
      id: 'anyId',
      type: 'email',
      recipient: 'anyEmail@gmail.com',
      scheduledTime: scheduledTime,
      scheduleDateHour: scheduleDateHour,
      content: 'AnyContent',
      updatedAt: new Date()
    })
  })

  test('should return a correct output', async () => {
    notificationRepository.update.mockResolvedValue(fakeNotification)
    const output = await sut.execute(input)
    expect(output).toEqual(fakeNotification)
  })
})
