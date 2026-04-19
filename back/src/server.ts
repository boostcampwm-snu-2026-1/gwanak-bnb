import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import accommodationRoutes from './routes/accommodation.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI as string;

// Middleware
app.use(cors()); // 프론트엔드 연동을 위해 CORS 허용
app.use(express.json());

// Routes
app.use('/api/accommodations', accommodationRoutes);

// DB Connection & Server Start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB 연결 성공');
    app.listen(PORT, () => {
      console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
    });
  })
  .catch((error) => console.error('MongoDB 연결 에러:', error));