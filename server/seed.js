const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

const Accommodation = require('./models/Accommodation');

dns.setServers(['8.8.8.8']);

const dummyData = [
  ...Array.from({ length: 10 }).map((_, i) => ({
    title: `서울 감성 숙소 ${i + 1}호`,
    description: "남산타워 뷰가 보이는 깨끗한 숙소입니다.",
    region: "서울",
    price: 150000 + (i * 10000),
    capacity: { maxGuests: (i % 4) + 2 },
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750"],
    amenities: ["무선 인터넷", "주방", "에어컨"]
  })),
  
  ...Array.from({ length: 10 }).map((_, i) => ({
    title: `부산 바다앞 숙소 ${i + 1}호`,
    description: "광안대교 야경을 즐길 수 있는 최고의 선택입니다.",
    region: "부산",
    price: 120000 + (i * 8000),
    capacity: { maxGuests: (i % 6) + 2 },
    images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"],
    amenities: ["무선 인터넷", "무료 주차", "바다 뷰"]
  })),
  
  ...Array.from({ length: 10 }).map((_, i) => ({
    title: `제주 돌담 독채 ${i + 1}호`,
    description: "제주 정취를 그대로 느낄 수 있는 조용한 독채입니다.",
    region: "제주도",
    price: 200000 + (i * 15000),
    capacity: { maxGuests: (i % 8) + 2 },
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb"],
    amenities: ["무선 인터넷", "마당", "바비큐 그릴"]
  }))
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ 데이터 시딩을 위해 DB 연결 성공");
    
    await Accommodation.deleteMany({}); 
    console.log("기존 데이터 삭제 완료");

    await Accommodation.insertMany(dummyData);
    console.log("🚀 30개의 더미 데이터가 성공적으로 입력되었습니다!");
    
    process.exit();
  } catch (err) {
    console.error("❌ 시딩 실패:", err);
    process.exit(1);
  }
};

seedDB();