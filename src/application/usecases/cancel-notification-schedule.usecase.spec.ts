import { NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { InvalidParamError, MissingParamError } from '@/shared/errors'
import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { CancelNotificationScheduleUseCase } from './cancel-notification-schedule.usecase'
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

describe('CancelNotificationScheduleUseCase', () => {
  let sut: CancelNotificationScheduleUseCase
  let id: string
  let now: Date

  beforeEach(() => {
    sut = new CancelNotificationScheduleUseCase(notificationRepository)
    now = new Date()
    now.setHours(now.getHours() + 5)
    id = 'anyId'
    notificationRepository.getById.mockResolvedValue(fakeNotification)
    notificationRepository.cancel.mockResolvedValue(fakeNotification)
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throws if id is not provided', async () => {
    id = undefined as any
    const promise = sut.execute(id)
    await expect(promise).rejects.toThrowError(new MissingParamError('id'))
  })

  test('should throws if NotificationRepository.getById once and with correct values', async () => {
    await sut.execute(id)
    expect(notificationRepository.getById).toHaveBeenCalledTimes(1)
    expect(notificationRepository.getById).toHaveBeenCalledWith('anyId')
  })

  test('should throws if NotificationRepository.getById returns null', async () => {
    notificationRepository.getById.mockResolvedValueOnce(null)
    const promise = sut.execute(id)
    await expect(promise).rejects.toThrowError(new InvalidParamError('id'))
  })

  test('should call NotificationRepository.cancel once and with correct values', async () => {
    await sut.execute(id)
    expect(notificationRepository.cancel).toHaveBeenCalledTimes(1)
    expect(notificationRepository.cancel).toHaveBeenCalledWith('anyId')
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(id)
    expect(output).toEqual(fakeNotification)
  })
})
