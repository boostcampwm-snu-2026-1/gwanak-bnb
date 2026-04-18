// server/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // .env 파일의 환경변수 불러오기

const accommodationsRouter = require('./routes/accommodations');

const app = express();
const PORT = process.env.PORT || 8080;

// 미들웨어 설정
app.use(cors()); // 프론트엔드와 통신 허용
app.use(express.json()); // JSON 데이터 파싱 허용

// DB 연결
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB 연결 성공!'))
  .catch((err) => console.error('❌ MongoDB 연결 실패:', err));

app.use('/api/accommodations', accommodationsRouter);

// 기본 라우트 (서버가 잘 떴는지 확인용)
app.get('/', (req, res) => {
  res.send('Gwanak-BNB 서버가 정상적으로 실행 중입니다.');
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});