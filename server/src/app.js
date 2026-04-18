import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'

const app = express()
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  }),
)
app.use(express.json())
app.use('/api', routes)

export default app
