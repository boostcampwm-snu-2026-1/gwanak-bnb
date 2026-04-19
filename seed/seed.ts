import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Accommodation from './models/Accommodation';
import dummyData from './dummyData.json';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  console.error('MONGO_URI가 .env 파일에 설정되지 않았습니다.');
  process.exit(1);
}

const seedDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB 연결 성공');
    
    await Accommodation.deleteMany({}); // 기존 데이터 초기화
    console.log('기존 데이터 삭제 완료');
    
    await Accommodation.insertMany(dummyData); // 데이터 삽입
    console.log('더미 데이터 Seeding 완료!');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding 에러:', error);
    process.exit(1);
  }
};

seedDB();