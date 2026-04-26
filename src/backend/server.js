import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '.env');

if (fs.existsSync(envPath)) {
    console.log(`✅ .env 파일 발견: ${envPath}`);
    dotenv.config({ path: envPath });
} else {
    console.error(`❌ .env 파일이 이 경로에 없음: ${envPath}`);
}
const PORT = process.env.PORT || 3000;
const URI = process.env.URI;

if (!URI) {
    console.error('MongoDB URI가 설정되지 않았습니다! Render 대시보드를 확인하세요.');
    process.exit(1);
}

mongoose.connect(URI)
  .then(() => {
    console.log('✅ MongoDB 연결 성공!');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ DB 연결 에러:', err);
    process.exit(1);
  });