import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import accommodationRouter from './routes/accommodations.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 라우터 연결
app.use('/api/accommodations', accommodationRouter);

// MongoDB 연결 후 서버 시작
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공!');
    app.listen(process.env.PORT, () => {
      console.log(`서버 실행 중: http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error('MongoDB 연결 실패:', err));