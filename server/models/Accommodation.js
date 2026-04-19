import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema({
  name: String,           // 숙소 이름
  location: String,       // 지역 (검색 조건)
  maxGuests: Number,      // 최대 인원 (검색 조건)
  pricePerNight: Number,  // 1박 가격
  description: String,    // 설명
  imageUrl: String,       // 이미지 URL
});

export default mongoose.model('Accommodation', accommodationSchema);