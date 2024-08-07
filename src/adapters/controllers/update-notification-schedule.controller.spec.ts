import { HttpRequest } from '@/shared/types'
import { NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'
import { UpdateNotificationScheduleController } from './update-notification-schedule.controller'
import { UpdateNotificationScheduleUseCaseInterface } from '@/domain/interfaces/usecases/update-notification-schedule.interface'
import { mock } from 'jest-mock-extended'

const usecase = mock<UpdateNotificationScheduleUseCaseInterface>()
const fakeOutput = {
  id: 'anyId',
  type: 'whatsapp' as NotificationTypes,
  recipient: '32999895689',
  scheduledTime: 123456789,
  scheduleDateHour: new Date(),
  content: 'AnyContent',
  status: 'waiting' as NotificationStatus,
  createdAt: new Date(),
  updatedAt: new Date()
}

describe('UpdateNotificationScheduleController', () => {
  let sut: UpdateNotificationScheduleController
  let input: HttpRequest

  beforeEach(() => {
    sut = new UpdateNotificationScheduleController(usecase)
    input = {
      body: {
        type: 'whatsapp' as NotificationTypes,
        recipient: 'anyRecipient',
        content: 'AnyContent',
        scheduleDateHour: new Date()
      },
      params: {
        id: 'anyId'
      }
    }
    usecase.execute.mockResolvedValue(fakeOutput)
  })

  test('should call usecase once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith({ id: input.params.id, ...input.body })
  })

  test('should return a correct output', async () => {
    const output = await sut.execute(input)
    expect(output).toEqual({ statusCode: 200, body: fakeOutput })
  })

  test('should return a correct error if UseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    usecase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
