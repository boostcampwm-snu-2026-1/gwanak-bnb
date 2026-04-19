import mongoose from 'mongoose';

const accommodateSchema = new mongoose.Schema({
  // 1. 기본 정보
  title: { type: String, required: true }, // 숙소 이름
  destination: { type: String, required: true }, // 검색용 지역 
  locationShort: { type: String, required: true }, // UI 표시용 
  type: String, // 숙소 유형
  
  // 2. 이미지
  imageUrl: { type: String, required: true },

  // 3. 평점 & 리뷰
  rating: { type: Number, default: 0 }, // 평점
  reviewCount: { type: Number, default: 0 }, // 리뷰 수 

  // 4. 가격 정보
  pricePerNight: { type: Number, required: true }, // 1박 기준

  // 5. 숙소 시설 정보
  capacity: {
    adult: { type: Number, required: true },
    child: { type: Number, default: 0 },
    infant: { type: Number, default: 0 },
    pet: { type: Number, default: 0 }
  },
  bedrooms: { type: Number, required: true }, // 침실 수
  beds: { type: Number, required: true }, // 침대 수 

  // 6. UI
  isGuestFavorite: { type: Boolean, default: false }, // 게스트 선호 뱃지
  availableDates: String, // 예약 가능 날짜 

}, { timestamps: true });

export default mongoose.model('Accommodate', accommodateSchema);