// server/models/Accommodation.js
const mongoose = require('mongoose');

// 숙소 데이터의 생김새(스키마) 정의
const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true },       // 숙소 이름 (예: 바다가 보이는 펜션)
  location: { type: String, required: true },   // 지역 (예: 부산광역시)
  maxGuests: { type: Number, required: true },  // 최대 수용 인원 (예: 4)
  price: { type: Number, required: true },      // 1박 가격 (예: 150000)
  imageUrl: { type: String }                    // 숙소 썸네일 이미지 주소
});

module.exports = mongoose.model('Accommodation', accommodationSchema);