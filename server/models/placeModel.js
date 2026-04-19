import mongoose from 'mongoose';

const { Schema } = mongoose;

// 숙소 스키마
const placeSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    required: true,
    trim: true
  },

  location: {
    province: { type: String, required: true }, // "제주특별자치도"
    city: { type: String, required: true },     // "서귀포시"
    district: { type: String },                 // "성산읍" 또는 "구좌읍"

    // 핵심: 연관 검색어 배열
    // 사용자가 "제주", "서귀포", "구좌" 중 무엇을 쳐도 이 숙소가 나오게 함
    searchTags: [String],

    address: String, // 전체 주소
  },

  capacity: {
    maxGuests: { type: Number, required: true }, // 성인 + 어린이
    maxInfants: { type: Number, default: 0 },
    allowPets: { type: Boolean, default: false },
    maxPets: { type: Number, default: 0 } // 최대 반려동물 수
  },

  details: {
    bedrooms: { type: Number, required: true },
    beds: { type: Number, required: true },
    bathrooms: { type: Number, default: 1 }
  },

  pricing: {
    basePrice: { type: Number, required: true }, // 1박 기준 가격
    currency: { type: String, default: 'KRW' }
  },

  ratings: {
    overall: { type: Number, required: true, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 }
  },

  amenities: [String], // ['Wi-Fi', '주방', '주차', '에어컨']

  images: [{
    url: { type: String, required: true },
    alt: String,
    isMain: { type: Boolean, default: false }
  }],

  availability: {
    availableFrom: Date,
    availableTo: Date,
    blockedDates: [Date] // 예약 불가능한 날짜들
  },

  host: {
    name: String,
    avatar: String,
    isSuperhost: { type: Boolean, default: false }
  },

  policies: {
    checkInTime: { type: String, default: '15:00' },
    checkOutTime: { type: String, default: '11:00' },
    cancellationPolicy: { type: String, default: 'moderate' }
  }
}, {
  timestamps: true, // createdAt, updatedAt 자동 생성
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// 인덱스 설정 (검색 성능 향상)
placeSchema.index({ 'location.searchTags': 1 });
placeSchema.index({ 'capacity.maxGuests': 1 });
placeSchema.index({ 'capacity.maxInfants': 1 });
placeSchema.index({ 'capacity.allowPets': 1 });
placeSchema.index({ 'ratings.overall': -1 });

// 가상 필드: 총 게스트 수 (성인 + 유아)
placeSchema.virtual('totalCapacity').get(function() {
  return this.capacity.maxGuests + this.capacity.maxInfants;
});

// 정적 메서드: 검색 쿼리 빌더
placeSchema.statics.findBySearchCriteria = function(criteria) {
  const { destination, adults = 0, children = 0, infants = 0, pets = 0 } = criteria;

  const query = {};

  // 여행지 검색 (searchTags, city, district 활용)
  if (destination) {
    const normalizedDestination = destination.trim().toLowerCase();
    const searchPattern = {
      $regex: normalizedDestination,
      $options: 'i'
    };

    query.$or = [
      { 'location.searchTags': searchPattern },
      { 'location.city': searchPattern },
      { 'location.district': searchPattern },
      { 'location.province': searchPattern }
    ];
  }

  // 게스트 수 필터링
  const totalGuests = Number(adults) + Number(children);
  const totalInfants = Number(infants);
  const totalPets = Number(pets);

  // 성인 + 어린이 수 확인
  if (totalGuests > 0) {
    query['capacity.maxGuests'] = { $gte: totalGuests };
  }

  // 유아 수 확인
  if (totalInfants > 0) {
    query['capacity.maxInfants'] = { $gte: totalInfants };
  }

  // 반려동물 수 확인
  if (totalPets > 0) {
    query['capacity.allowPets'] = true;
    query['capacity.maxPets'] = { $gte: totalPets };
  }

  return this.find(query);
};

const Place = mongoose.model('Place', placeSchema);

export default Place;