import { Router } from 'express'
import { expressRouteAdapter } from './tools/express'
import { makeScheduleNotificationControllerFactory } from './factories/controllers/schedule-notification-controller.factory'
import { makeUpdateNotificationScheduleControllerFactory } from './factories/controllers/update-notification-schedule-controller.factory'

const router = Router()

router.patch('/notification/schedule/:id', expressRouteAdapter(makeUpdateNotificationScheduleControllerFactory()))
router.post('/notification/schedule', expressRouteAdapter(makeScheduleNotificationControllerFactory()))

export { router }
