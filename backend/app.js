import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB 연결 성공!"))
  .catch((err) => console.error("MongoDB 연결 실패:", err))

app.get("/", (req, res) => {
  res.json({ message: "서버 정상 동작 중" })
})

app.listen(PORT, () => {
  console.log(`서버 실행 중: ${PORT}`)
})