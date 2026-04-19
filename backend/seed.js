import mongoose from 'mongoose';
import Listing from './models/Listing.js';
import dotenv from 'dotenv';
dotenv.config();

const DUMMY_LISTINGS = [
  { name: '서귀포시의 펜션', location: '제주', maxGuests: 6, description: '제주_산방산뷰_서턴가족_3(실내온수풀, 바베큐)', rooms: '침실 2개 · 침대 4개', pricePerNight: 335035, totalPrice: 1675178, rating: 4.94, reviewCount: 32, images: [], badge: '게스트 선호', extra: '오늘 ₩0 결제 · 취소 수수료 없음' },
  { name: '제주의 집', location: '제주', maxGuests: 4, description: '아이 안심! 숲뷰 독채 | 사계절 무료 온수 키즈풀', rooms: '침실 1개 · 침대 2개', pricePerNight: 291700, totalPrice: 1458500, rating: 4.97, reviewCount: 69, images: [], badge: '게스트 선호', extra: '취소 수수료 없음' },
  { name: '제주의 타운하우스', location: '제주', maxGuests: 8, description: '스테이베다니/확~트인 바다뷰/일출일몰/넓은마당', rooms: '침실 2개 · 침대 3개', pricePerNight: 145567, totalPrice: 727836, rating: 5.0, reviewCount: 92, images: [], badge: '게스트 선호', extra: '오늘 ₩0 결제 · 취소 수수료 없음' },
  { name: '서귀포시의 집', location: '제주', maxGuests: 4, description: '제주_산방산뷰_가족시간(실내온수풀, 바베큐)', rooms: '침실 2개 · 퀸사이즈 침대 2개', pricePerNight: 439012, totalPrice: 2195060, rating: 4.96, reviewCount: 46, images: [], badge: '게스트 선호', extra: '오늘 ₩0 결제 · 취소 수수료 없음' },
  { name: '제주의 게스트용 별채', location: '제주', maxGuests: 2, description: '하얀집(별채), 협재바다 1초컷, 협재 해수욕장 도보 1분', rooms: '침실 1개 · 퀸사이즈 침대 1개', pricePerNight: 234177, totalPrice: 1170889, rating: 4.99, reviewCount: 275, images: [], badge: '게스트 선호', extra: '오늘 ₩0 결제 · 취소 수수료 없음' },
  { name: '구좌읍의 게스트용 별채', location: '제주', maxGuests: 2, description: '월정바다 바로앞, 아늑한 제주옛집 (바다앞 감성숙소)', rooms: '침실 1개 · 침대 2개', pricePerNight: 122461, totalPrice: 612306, rating: 4.81, reviewCount: 121, images: [], badge: '게스트 선호', extra: '취소 수수료 없음' },
  { name: '제주의 펜션', location: '제주', maxGuests: 4, description: '잔디밭에서 뛰어노는 가족독채/잔디마당/바베큐', rooms: '침실 2개 · 퀸사이즈 침대 1개', pricePerNight: 216980, totalPrice: 1084900, rating: 4.89, reviewCount: 207, images: [], badge: '게스트 선호', extra: '취소 수수료 없음' },
  { name: '구좌읍의 집', location: '제주', maxGuests: 4, description: '작은집요기, 구좌읍 세화, 평대해변 비자림 근처', rooms: '침실 2개 · 침대 2개', pricePerNight: 161479, totalPrice: 807395, rating: 4.92, reviewCount: 719, images: [], badge: '슈퍼호스트', extra: '취소 수수료 없음' },
  { name: '해운대 오션뷰 아파트', location: '부산', maxGuests: 4, description: '해운대 해변 도보 3분, 오션뷰 전망', rooms: '침실 2개 · 침대 2개', pricePerNight: 150000, totalPrice: 750000, rating: 4.88, reviewCount: 143, images: [], badge: '게스트 선호', extra: '취소 수수료 없음' },
  { name: '광안리 감성 숙소', location: '부산', maxGuests: 2, description: '광안대교 야경이 한눈에 보이는 감성 숙소', rooms: '침실 1개 · 퀸사이즈 침대 1개', pricePerNight: 98000, totalPrice: 490000, rating: 4.76, reviewCount: 88, images: [], badge: '게스트 선호', extra: '오늘 ₩0 결제 · 취소 수수료 없음' },
  { name: '강릉 경포대 독채', location: '강릉', maxGuests: 6, description: '경포호수 바로 앞 독채, 바베큐 포함', rooms: '침실 3개 · 침대 4개', pricePerNight: 180000, totalPrice: 900000, rating: 4.95, reviewCount: 62, images: [], badge: '게스트 선호', extra: '취소 수수료 없음' },
  { name: '강릉 안목해변 게스트하우스', location: '강릉', maxGuests: 2, description: '커피거리 도보 1분, 바다 조망', rooms: '침실 1개 · 침대 1개', pricePerNight: 75000, totalPrice: 375000, rating: 4.70, reviewCount: 39, images: [], badge: null, extra: '취소 수수료 없음' },
  { name: '여수 돌산도 펜션', location: '여수', maxGuests: 8, description: '돌산도 바다 전망, 넓은 테라스 바베큐', rooms: '침실 3개 · 침대 5개', pricePerNight: 220000, totalPrice: 1100000, rating: 4.91, reviewCount: 54, images: [], badge: '슈퍼호스트', extra: '오늘 ₩0 결제 · 취소 수수료 없음' },
  { name: '이순신광장 앞 아파트', location: '여수', maxGuests: 4, description: '여수 야경 명소 바로 앞, 깔끔한 시내 숙소', rooms: '침실 2개 · 침대 2개', pricePerNight: 130000, totalPrice: 650000, rating: 4.82, reviewCount: 97, images: [], badge: '게스트 선호', extra: '취소 수수료 없음' },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Listing.deleteMany({});
  await Listing.insertMany(DUMMY_LISTINGS);
  console.log(`✅ ${DUMMY_LISTINGS.length}개 더미 데이터 저장 완료`);
  await mongoose.disconnect();
}

seed().catch(console.error);
