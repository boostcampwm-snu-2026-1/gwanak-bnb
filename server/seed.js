import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Accommodation from './models/Accommodation.js';

dotenv.config();

const dummyData = [
  {
    title: '부산 해운대 오션뷰',
    description: '바다가 보이는 감성 숙소, 해운대 해변 도보 3분',
    price: 85000,
    location: { province: '부산광역시', city: '해운대구', district: '우동', address: '해운대로 123' },
    capacity: { maxGuests: 4, maxInfants: 2, petsAllowed: false, bedrooms: 2, beds: 2, bathrooms: 1 },
    roomType: 'entire',
    amenities: ['와이파이', '오션뷰', '에어컨'],
    images: ['https://picsum.photos/seed/busan1/400/300'],
    rating: 4.8,
    reviewCount: 24,
  },
  {
    title: '제주 애월 감성 독채',
    description: '애월 바닷가 근처 독채, 프라이빗한 휴식',
    price: 120000,
    location: { province: '제주특별자치도', city: '제주시', district: '애월읍', address: '애월로 45' },
    capacity: { maxGuests: 6, maxInfants: 2, petsAllowed: true, bedrooms: 3, beds: 3, bathrooms: 2 },
    roomType: 'entire',
    amenities: ['와이파이', '주차장', '바베큐', '정원'],
    images: ['https://picsum.photos/seed/jeju1/400/300'],
    rating: 4.9,
    reviewCount: 42,
  },
  {
    title: '서울 강남 비즈니스',
    description: '강남역 도보 5분, 출장에 최적화된 숙소',
    price: 95000,
    location: { province: '서울특별시', city: '강남구', district: '역삼동', address: '테헤란로 152' },
    capacity: { maxGuests: 2, maxInfants: 1, petsAllowed: false, bedrooms: 1, beds: 1, bathrooms: 1 },
    roomType: 'private',
    amenities: ['와이파이', '에어컨', '세탁기', '넷플릭스'],
    images: ['https://picsum.photos/seed/gangnam1/400/300'],
    rating: 4.5,
    reviewCount: 18,
  },
  {
    title: '해운대 바닷가 통창 숙소',
    description: '해운대 바다 직관 1열 통창, 일출 명소',
    price: 150000,
    location: { province: '부산광역시', city: '해운대구', district: '중동', address: '해운대해변로 100' },
    capacity: { maxGuests: 3, maxInfants: 1, petsAllowed: false, bedrooms: 1, beds: 2, bathrooms: 1 },
    roomType: 'entire',
    amenities: ['와이파이', '오션뷰', '에어컨', '욕조'],
    images: ['https://picsum.photos/seed/busan2/400/300'],
    rating: 4.7,
    reviewCount: 31,
  },
  {
    title: '서울 홍대 디자인 스튜디오',
    description: '홍대입구역 도보 3분, 트렌디한 인테리어',
    price: 70000,
    location: { province: '서울특별시', city: '마포구', district: '서교동', address: '와우산로 88' },
    capacity: { maxGuests: 2, maxInfants: 0, petsAllowed: false, bedrooms: 1, beds: 1, bathrooms: 1 },
    roomType: 'entire',
    amenities: ['와이파이', '에어컨', '세탁기'],
    images: ['https://picsum.photos/seed/hongdae1/400/300'],
    rating: 4.6,
    reviewCount: 55,
  },
  {
    title: '제주 서귀포 한라산뷰 펜션',
    description: '한라산이 한눈에 보이는 조용한 펜션',
    price: 100000,
    location: { province: '제주특별자치도', city: '서귀포시', district: '중문동', address: '중문로 200' },
    capacity: { maxGuests: 5, maxInfants: 2, petsAllowed: true, bedrooms: 2, beds: 3, bathrooms: 1 },
    roomType: 'entire',
    amenities: ['와이파이', '주차장', '바베큐', '마운틴뷰'],
    images: ['https://picsum.photos/seed/jeju2/400/300'],
    rating: 4.4,
    reviewCount: 12,
  },
  {
    title: '서울 종로 한옥 스테이',
    description: '북촌한옥마을 전통 한옥 체험',
    price: 130000,
    location: { province: '서울특별시', city: '종로구', district: '가회동', address: '북촌로 55' },
    capacity: { maxGuests: 4, maxInfants: 1, petsAllowed: false, bedrooms: 2, beds: 2, bathrooms: 1 },
    roomType: 'entire',
    amenities: ['와이파이', '한옥체험', '마당'],
    images: ['https://picsum.photos/seed/jongro1/400/300'],
    rating: 4.9,
    reviewCount: 67,
  },
  {
    title: '강릉 경포대 서핑하우스',
    description: '경포해변 앞 서핑보드 무료 대여',
    price: 80000,
    location: { province: '강원특별자치도', city: '강릉시', district: '강문동', address: '경포로 300' },
    capacity: { maxGuests: 6, maxInfants: 2, petsAllowed: true, bedrooms: 3, beds: 4, bathrooms: 2 },
    roomType: 'entire',
    amenities: ['와이파이', '서핑보드', '주차장', '바베큐'],
    images: ['https://picsum.photos/seed/gangneung1/400/300'],
    rating: 4.3,
    reviewCount: 29,
  },
  {
    title: '서울 성수동 루프탑 숙소',
    description: '성수동 핫플 루프탑에서 서울 야경 감상',
    price: 110000,
    location: { province: '서울특별시', city: '성동구', district: '성수동', address: '서울숲길 20' },
    capacity: { maxGuests: 3, maxInfants: 1, petsAllowed: false, bedrooms: 1, beds: 2, bathrooms: 1 },
    roomType: 'entire',
    amenities: ['와이파이', '루프탑', '에어컨', '넷플릭스'],
    images: ['https://picsum.photos/seed/seongsu1/400/300'],
    rating: 4.7,
    reviewCount: 38,
  },
  {
    title: '여수 밤바다 뷰 펜션',
    description: '여수 밤바다가 한눈에, 낭만 가득한 숙소',
    price: 90000,
    location: { province: '전라남도', city: '여수시', district: '돌산읍', address: '돌산로 150' },
    capacity: { maxGuests: 4, maxInfants: 2, petsAllowed: true, bedrooms: 2, beds: 2, bathrooms: 1 },
    roomType: 'entire',
    amenities: ['와이파이', '오션뷰', '주차장', '바베큐'],
    images: ['https://picsum.photos/seed/yeosu1/400/300'],
    rating: 4.6,
    reviewCount: 21,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB 연결 성공');

    await Accommodation.deleteMany({});
    console.log('기존 데이터 삭제 완료');

    await Accommodation.insertMany(dummyData);
    console.log(`더미 데이터 ${dummyData.length}개 삽입 완료`);

    await mongoose.disconnect();
    console.log('시딩 완료!');
  } catch (error) {
    console.error('시딩 실패:', error.message);
    process.exit(1);
  }
}

seed();
