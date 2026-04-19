const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');
require('dotenv').config();

dns.setServers(['8.8.8.8']);

const accommodationRoutes = require('./routes/accommodationRoutes');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 연결 성공'))
  .catch((err) => {
    console.error('❌ MongoDB 연결 실패');
    console.error('에러 상세:', err.message);
  });

app.use('/api/accommodations', accommodationRoutes);

app.get('/', (req, res) => {res.send('백엔드 서버가 활성화됨');});

app.listen(PORT, () => {console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);});