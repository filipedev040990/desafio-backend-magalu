import { HttpRequest } from '@/shared/types'
import { ScheduleNotificationController } from './schedule-notification.controller'
import { NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { mock } from 'jest-mock-extended'
import { ScheduleNotificationUseCaseInterface } from '@/domain/interfaces/usecases/schedule-notification.interface'
import { InvalidParamError } from '@/shared/errors'
import { badRequest } from '@/shared/helpers/http.helper'

const usecase = mock<ScheduleNotificationUseCaseInterface>()
const fakeOutput = {
  id: 'anyId',
  type: 'whatsapp' as NotificationTypes,
  recipient: 'anyRecipient',
  scheduled_time: 123456789,
  schedule_date_hour: new Date(),
  content: 'AnyContent',
  status: 'waiting' as NotificationStatus,
  createdAt: new Date()
}

describe('ScheduleNotificationController', () => {
  let sut: ScheduleNotificationController
  let input: HttpRequest

  beforeEach(() => {
    sut = new ScheduleNotificationController(usecase)
    input = {
      body: {
        type: 'whatsapp' as NotificationTypes,
        recipient: 'anyRecipient',
        content: 'AnyContent',
        schedule_date_hour: new Date()
      }
    }
    usecase.execute.mockResolvedValue(fakeOutput)
  })

  test('should call usecase once and with correct values', async () => {
    await sut.execute(input)
    expect(usecase.execute).toHaveBeenCalledTimes(1)
    expect(usecase.execute).toHaveBeenCalledWith(input.body)
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
