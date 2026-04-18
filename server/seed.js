// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Accommodation = require('./models/Accommodation'); // 아까 만든 스키마 불러오기

// 더미 데이터
const dummyData = [
  {
    name: "제주도 푸른 밤 오션뷰 펜션",
    location: "제주도", 
    maxGuests: 4,
    price: 150000,
    imageUrl: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500&q=80"
  },
  {
    name: "제주 감성 돌담 독채 민박",
    location: "제주특별자치도",
    maxGuests: 2,
    price: 120000,
    imageUrl: "https://images.unsplash.com/photo-1540339832862-4745ea72a445?w=500&q=80"
  },
  {
    name: "부산 해운대 파노라마 오션뷰",
    location: "부산광역시",
    maxGuests: 6,
    price: 250000,
    imageUrl: "https://images.unsplash.com/photo-1542852206-ce60269f88d7?w=500&q=80"
  },
  {
    name: "서울 남산 타워 뷰 모던 스튜디오",
    location: "서울특별시",
    maxGuests: 2,
    price: 180000,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80"
  },
  {
    name: "전주 한옥마을 고즈넉한 고택",
    location: "전주 한옥마을",
    maxGuests: 5,
    price: 200000,
    imageUrl: "https://images.unsplash.com/photo-1590518776098-b8ce778ff952?w=500&q=80"
  },
  {
    name: "속초 바다 앞 감성 스테이",
    location: "속초시",
    maxGuests: 4,
    price: 130000,
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&q=80"
  }
];

// DB 연결 및 데이터 삽입 로직
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB 연결 성공! 데이터 초기화 중...');
    
    // 1. 기존에 있던 데이터 싹 비우기 (중복 방지)
    await Accommodation.deleteMany({}); 
    
    // 2. 새로운 더미 데이터 한꺼번에 넣기
    await Accommodation.insertMany(dummyData); 
    
    console.log('🎉 더미 데이터 삽입 완료!');
    
    // 3. 작업이 끝났으니 DB 연결 깔끔하게 끊기
    mongoose.disconnect(); 
  })
  .catch((err) => console.error('❌ 에러 발생:', err));