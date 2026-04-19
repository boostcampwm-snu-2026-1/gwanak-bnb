import cors from 'cors'
import express from 'express'
import listingRoutes from './routes/listingRoutes.js'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
  }),
)
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    message: 'gwanak-bnb api server is running',
  })
})

app.use('/api/listings', listingRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app
