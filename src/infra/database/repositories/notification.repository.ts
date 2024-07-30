import { NotificationEntity } from '@/domain/entities/notification.entity'
import { NotificationRepositoryInterface, ScheduleNotificationRepositoryInput } from '@/domain/interfaces/repositories/notification.repository.interface'
import { prismaClient } from '../prisma-client'

export class NotificationRepository implements NotificationRepositoryInterface {
  async schedule (data: ScheduleNotificationRepositoryInput): Promise<NotificationEntity> {
    return await prismaClient.notification.create({ data })
  }
}
