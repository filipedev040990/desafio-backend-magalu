export interface SendNotificationsUseCaseInterface {
  execute: (currentMinuteTimestamp: string) => Promise<void>
}
