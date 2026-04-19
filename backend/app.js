const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const accommodateRouter = require('./routers/AccommodateController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/accommodates', accommodateRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공');
    app.listen(PORT, () => {
      console.log(`서버 실행 중: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB 연결 실패:', err.message);
  });
