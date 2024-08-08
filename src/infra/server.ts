import 'module-alias/register'
import express from 'express'
import cors from 'cors'
import { logger } from '@/shared/helpers/logger.helper'
import { router } from './routes'
import { sendNotifications } from './bot/send-notification.bot'

const start = async (): Promise<void> => {
  try {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use('/v1', router)

    const port = process.env.PORT ?? 3000
    await sendNotifications()

    app.listen(port, () => logger.info(`Server running at port ${port}`))
  } catch (error) {
    logger.error(error)
  }
}

void start()
