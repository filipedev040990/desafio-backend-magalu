import { ListAllNotificationsScheduleUseCaseInterface } from '@/domain/interfaces/usecases/list-all-notifications-schedule.interface'
import { NotificationStatus, NotificationTypes } from '@/domain/entities/notification.entity'
import { badRequest } from '@/shared/helpers/http.helper'
import { InvalidParamError } from '@/shared/errors'
import { ListAllNotificationsScheduleController } from './list-all-notifications-schedule.controller'
import { mock } from 'jest-mock-extended'

const usecase = mock<ListAllNotificationsScheduleUseCaseInterface>()
const fakeOutputs = [{
  id: 'anyId',
  type: 'whatsapp' as NotificationTypes,
  recipient: '32999895689',
  scheduledTime: 123456789,
  scheduleDateHour: new Date(),
  content: 'AnyContent',
  status: 'waiting' as NotificationStatus,
  createdAt: new Date(),
  updatedAt: new Date()
}]

describe('ListAllNotificationsScheduleController', () => {
  let sut: ListAllNotificationsScheduleController

  beforeEach(() => {
    sut = new ListAllNotificationsScheduleController(usecase)
    usecase.execute.mockResolvedValue(fakeOutputs)
  })

  test('should call usecase once', async () => {
    await sut.execute()
    expect(usecase.execute).toHaveBeenCalledTimes(1)
  })

  test('should return a correct output', async () => {
    const output = await sut.execute()
    expect(output).toEqual({ statusCode: 200, body: fakeOutputs })
  })

  test('should return a correct error if UseCase throws', async () => {
    const error = new InvalidParamError('anyParam')
    usecase.execute.mockImplementationOnce(() => {
      throw error
    })

    const output = await sut.execute()

    expect(output).toEqual(badRequest(error))
  })
})
