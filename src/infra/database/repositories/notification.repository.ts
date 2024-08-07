import { NotificationEntity, NotificationTypes } from '@/domain/entities/notification.entity'
import { NotificationRepositoryInterface, CreateScheduleNotificationRepositoryInput, UpdateScheduleNotificationRepositoryInput } from '@/domain/interfaces/repositories/notification.repository.interface'
import { prismaClient } from '../prisma-client'

export class NotificationRepository implements NotificationRepositoryInterface {
  async schedule (data: CreateScheduleNotificationRepositoryInput): Promise<NotificationEntity> {
    const notification = await prismaClient.notification.create({ data })
    return this.mapModelToEntity(notification)
  }

  async update (input: UpdateScheduleNotificationRepositoryInput): Promise<NotificationEntity> {
    const updatedFields: Omit<UpdateScheduleNotificationRepositoryInput, 'id'> = {
      updatedAt: input.updatedAt
    }

    if (input.type) {
      updatedFields.type = input.type
    }

    if (input.recipient) {
      updatedFields.recipient = input.recipient
    }

    if (input.content) {
      updatedFields.content = input.content
    }

    if (input.scheduleDateHour) {
      updatedFields.scheduleDateHour = input.scheduleDateHour
    }

    if (input.scheduledTime) {
      updatedFields.scheduledTime = input.scheduledTime
    }

    const notification = await prismaClient.notification.update({
      where: {
        id: input.id
      },
      data: {
        ...updatedFields
      }
    })

    return this.mapModelToEntity(notification)
  }

  async getById (id: string): Promise<NotificationEntity | null> {
    const notification = await prismaClient.notification.findFirst({ where: { id } })
    if (!notification) {
      return null
    }
    return this.mapModelToEntity(notification)
  }

  mapModelToEntity (input: any): NotificationEntity {
    return {
      id: input.id,
      type: input.type as NotificationTypes,
      recipient: input.recipient,
      content: input.content,
      status: input.status,
      scheduleDateHour: input.scheduleDateHour,
      scheduledTime: input.scheduledTime,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt ?? null
    }
  }
}
