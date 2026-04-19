import cors from 'cors'
import express from 'express'
import { getCorsOrigins } from './config/env.js'
import { listingsRouter } from './routes/listings.routes.js'

export function createApp() {
  const app = express()
  const origins = getCorsOrigins()
  app.use(
    cors(
      origins === true
        ? { origin: true, credentials: true }
        : { origin: origins, credentials: true },
    ),
  )
  app.use(express.json())

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' })
  })

  app.use('/api/listings', listingsRouter)

  return app
}
