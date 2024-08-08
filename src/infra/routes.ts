import { Router } from 'express'
import { expressRouteAdapter } from './tools/express'
import { makeScheduleNotificationControllerFactory } from './factories/controllers/schedule-notification-controller.factory'
import { makeUpdateNotificationScheduleControllerFactory } from './factories/controllers/update-notification-schedule-controller.factory'
import { makeCancelNotificationScheduleControllerFactory } from './factories/controllers/cancel-notification-schedule-controller.factory'
import { makeListNotificationScheduleControllerFactory } from './factories/controllers/list-notification-schedule-controller.factory'

const router = Router()

router.patch('/notification/schedule/:id', expressRouteAdapter(makeUpdateNotificationScheduleControllerFactory()))
router.get('/notification/schedule/:id', expressRouteAdapter(makeListNotificationScheduleControllerFactory()))
router.post('/notification/schedule/cancel/:id', expressRouteAdapter(makeCancelNotificationScheduleControllerFactory()))
router.post('/notification/schedule', expressRouteAdapter(makeScheduleNotificationControllerFactory()))

export { router }
