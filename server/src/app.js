import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'
const localhostOriginPattern = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/

function isAllowedOrigin(origin) {
  if (!origin) {
    return true
  }

  if (origin === clientUrl) {
    return true
  }

  return localhostOriginPattern.test(origin)
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true)
        return
      }

      callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
  }),
)
app.use(express.json())
app.use('/api', routes)
app.use(errorHandler)

export default app
