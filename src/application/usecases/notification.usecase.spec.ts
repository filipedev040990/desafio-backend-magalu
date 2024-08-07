import { InvalidParamError } from '@/shared/errors'
import { NotificationUseCase } from './notification.usecase'
import MockDate from 'mockdate'

describe('NotificationUseCase', () => {
  let sut: any

  beforeEach(() => {
    sut = new NotificationUseCase()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throws if a valid type is provided', async () => {
    expect(() => {
      sut.validateType('invalid_type', '32978956325')
    }).toThrowError(new InvalidParamError('type'))
  })

  test('should throws if a valid type and invalid recipient is provided', async () => {
    expect(() => {
      sut.validateType('email', '32978956325')
    }).toThrowError(new InvalidParamError('type'))
  })

  test('should throws if a valid type and invalid recipient is provided', async () => {
    expect(() => {
      sut.validateType('whathsapp', 'any')
    }).toThrowError(new InvalidParamError('type'))
  })

  test('should throws if a invalid scheduleDateHour is provided', async () => {
    expect(() => {
      sut.validateScheduledDateHour('1990-01-01 00:00:00')
    }).toThrowError(new InvalidParamError('scheduleDateHour'))
  })
})
