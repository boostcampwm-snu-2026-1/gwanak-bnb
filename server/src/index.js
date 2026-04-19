import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import accommodationRoutes from './routes/accommodation.routes.js'
import { notFoundHandler, errorHandler } from './middleware/error.js'

const app = express()
const PORT = process.env.PORT || 4000

const allowedOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`))
    },
  })
)
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/accommodations', accommodationRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

start().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})
