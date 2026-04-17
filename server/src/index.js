import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

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
