import { NotificationRepositoryInterface } from '@/domain/interfaces/repositories/notification.repository.interface'
import { NotificationEntity } from '@/domain/entities/notification.entity'
import { ListALlNotificationsScheduleUseCaseInterface } from '@/domain/interfaces/usecases/list-all-notifications-schedule.interface'

export class ListAllNotificationsScheduleUseCase implements ListALlNotificationsScheduleUseCaseInterface {
  constructor (private readonly notificationRepository: NotificationRepositoryInterface) {}

  async execute (): Promise<NotificationEntity [] | null> {
    return await this.notificationRepository.listAll()
  }
}
