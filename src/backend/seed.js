import 'dotenv/config';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import Accommodate from './models/Accommodate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env'); 
dotenv.config({ path: envPath });

const URI = process.env.URI;

// ✨ 프론트엔드 SpotList 100개 완벽 동기화
const locations = [
  "서울", "부산", "강릉", "오사카", "제주도", "광안리", "속초", "경주", "전주", "여수", 
  "도쿄", "후쿠오카", "교토", "삿포로", "나고야", "오키나와", "다낭", "하노이", "호치민", "나트랑", 
  "방콕", "치앙마이", "푸켓", "파타야", "타이베이", "가오슝", "홍콩", "마카오", "싱가포르", "코타키나발루", 
  "쿠알라룸푸르", "발리", "보라카이", "세부", "마닐라", "파리", "니스", "리옹", "런던", "에든버러", 
  "로마", "피렌체", "베네치아", "밀라노", "바르셀로나", "마드리드", "세비야", "리스본", "포르투", "베를린", 
  "뮌헨", "프랑크푸르트", "프라하", "비엔나", "잘츠부르크", "부다페스트", "암스테르담", "취리히", "인터라켄", "루체른", 
  "뉴욕", "로스앤젤레스", "샌프란시스코", "시카고", "라스베이거스", "호놀룰루", "시애틀", "마이애미", "밴쿠버", "토론토", 
  "시드니", "멜버른", "브리즈번", "퍼스", "오클랜드", "퀸스타운", "수원", "인천", "울산", "대전", 
  "광주", "대구", "통영", "남해", "포항", "안동", "춘천", "정선", "군산", "목포", 
  "이스탄불", "두바이", "상하이", "베이징", "가나자와", "시즈오카", "나라", "가마쿠라", "하코네", "쿠사츠"
];

const types = ["집", "공동주택", "별장", "호텔", "저택"];

const images = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop"
];

// 📅 10일 간격 랜덤 날짜 생성기 
const getRandomDates = () => {
  const month = Math.floor(Math.random() * 12) + 1;
  const startDay = Math.floor(Math.random() * 18) + 1; 
  const endDay = startDay + 10; 
  return `${month}월 ${startDay}일 ~ ${month}월 ${endDay}일`;
};

const sampleData = Array.from({ length: 1000 }).map((_, i) => {
  const loc = locations[i % locations.length];
    const selectedType = types[Math.floor(Math.random() * types.length)];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  
  return {
    title: `${loc}의 멋진 숙소 #${i + 1}`,
    destination: loc,
    locationShort: `${loc}의 ${selectedType}`, 
    availableDates: getRandomDates(), 
    type: selectedType,
    imageUrl: randomImage,
    rating: parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(2)),
    reviewCount: Math.floor(Math.random() * 300),
    pricePerNight: Math.floor(Math.random() * (200000 - 30000) + 30000),
    capacity: {
      adult: Math.floor(Math.random() * 4) + 1,
      child: Math.floor(Math.random() * 2),
      infant: 99, // 유아 무제한 치트키
      pet: Math.random() > 0.5 ? 1 : 0
    },
    bedrooms: Math.floor(Math.random() * 3) + 1,
    beds: Math.floor(Math.random() * 3) + 1,
    isGuestFavorite: Math.random() > 0.7
  };
});

const seedDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("✅ DB 연결 성공!");

    await Accommodate.deleteMany({});
    console.log("🧹 기존 데이터 삭제 완료.");

    await Accommodate.insertMany(sampleData);
    console.log("🎁 1000개의 샘플 데이터 삽입 완료! (글로벌 100개 도시 매핑 완료 🌍)");

    await mongoose.connection.close();
    console.log("👋 모든 작업 완료 후 연결 종료.");
  } catch (err) {
    console.error("❌ 에러 발생:", err);
    process.exit(1);
  }
};

seedDB();


//기본 db 생성용(ai generated)