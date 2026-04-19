import 'dotenv/config'
import mongoose from 'mongoose'
import Accommodation from './models/Accommodation.js'

const data = [
  { name: '서울 종로 한옥 스테이', location: '서울', address: '서울 종로구', price: 85000, capacity: 2, rating: 4.9, description: '고즈넉한 한옥 마당이 있는 숙소' },
  { name: '서울 강남 모던 아파트', location: '서울', address: '서울 강남구', price: 120000, capacity: 4, rating: 4.7, description: '강남 중심부 접근성 최고' },
  { name: '서울 홍대 코지 룸', location: '서울', address: '서울 마포구', price: 65000, capacity: 2, rating: 4.5, description: '홍대 핫플레이스 도보 5분' },
  { name: '서울 이태원 게스트하우스', location: '서울', address: '서울 용산구', price: 45000, capacity: 6, rating: 4.3, description: '다국적 여행자들의 아지트' },
  { name: '부산 해운대 오션뷰', location: '부산', address: '부산 해운대구', price: 150000, capacity: 4, rating: 4.8, description: '해운대 바다가 한눈에 보이는 뷰' },
  { name: '부산 광안리 비치하우스', location: '부산', address: '부산 수영구', price: 95000, capacity: 3, rating: 4.6, description: '광안대교 야경을 즐기세요' },
  { name: '부산 감천 아트하우스', location: '부산', address: '부산 사하구', price: 70000, capacity: 2, rating: 4.5, description: '감천문화마을 골목 속 아늑한 방' },
  { name: '제주 협재 풀빌라', location: '제주', address: '제주 한림읍', price: 280000, capacity: 6, rating: 4.9, description: '에메랄드빛 협재 바다 앞 독채' },
  { name: '제주 성산 게스트하우스', location: '제주', address: '제주 성산읍', price: 45000, capacity: 2, rating: 4.4, description: '일출봉 도보 10분' },
  { name: '제주 서귀포 독채 펜션', location: '제주', address: '제주 서귀포시', price: 180000, capacity: 5, rating: 4.7, description: '한라산 뷰 감성 독채' },
  { name: '강릉 경포 바다뷰 펜션', location: '강릉', address: '강원 강릉시 경포동', price: 110000, capacity: 4, rating: 4.7, description: '경포대 해변 걸어서 3분' },
  { name: '강릉 안목 커피거리 숙소', location: '강릉', address: '강원 강릉시 견소동', price: 80000, capacity: 2, rating: 4.5, description: '안목 카페거리 바로 옆' },
  { name: '여수 돌산 리조트', location: '여수', address: '전남 여수시 돌산읍', price: 135000, capacity: 5, rating: 4.6, description: '여수 밤바다 조망 최고' },
  { name: '여수 항구 게스트하우스', location: '여수', address: '전남 여수시 중앙동', price: 55000, capacity: 3, rating: 4.4, description: '여수 구항 도보 2분' },
  { name: '경주 황리단길 한옥', location: '경주', address: '경북 경주시 황남동', price: 90000, capacity: 2, rating: 4.8, description: '신라 고도의 분위기를 느끼다' },
  { name: '경주 보문 호수 리조트', location: '경주', address: '경북 경주시 보문동', price: 130000, capacity: 4, rating: 4.6, description: '보문 호수 전망 스위트룸' },
  { name: '전주 한옥마을 스테이', location: '전주', address: '전북 전주시 완산구', price: 75000, capacity: 2, rating: 4.8, description: '600년 전통 한옥마을 한가운데' },
  { name: '속초 설악 산장', location: '속초', address: '강원 속초시 설악동', price: 100000, capacity: 4, rating: 4.5, description: '설악산 등산 거점 숙소' },
]

await mongoose.connect(process.env.MONGODB_URI)
await Accommodation.deleteMany({})
await Accommodation.insertMany(data)
console.log(`${data.length}개 숙소 데이터 삽입 완료`)
await mongoose.disconnect()
