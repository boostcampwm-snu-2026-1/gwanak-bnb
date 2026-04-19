import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import accommodationRoutes from './routes/accommodations.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/accommodations', accommodationRoutes)

app.get('/health', (req, res) => res.json({ status: 'ok' }))

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공')
    app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB 연결 실패:', err.message)
    process.exit(1)
  })
