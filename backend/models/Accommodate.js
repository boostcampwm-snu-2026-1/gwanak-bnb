const mongoose = require('mongoose');
const { Schema } = mongoose;

const accommodateSchema = new Schema({
  title:        { type: String, required: true },
  description:  { type: String, required: true },
  type:         { type: String, required: true },         // 숙소 유형 (아파트/주택/독채/호텔)
  buildingType: { type: String },                         // 건물 유형 (아파트/단독주택/빌라)

  address: {
    city:     { type: String, required: true },            // 시/도 (서울특별시)
    district: { type: String, required: true },            // 구/군 (관악구)
    detail:   { type: String },                            // 상세 주소
    lat:      { type: Number },                            // 위도
    lng:      { type: Number },                            // 경도
  },

  price:    { type: Number, required: true },              // 1박 가격 (원)
  capacity: { type: Number, required: true },              // 최대 수용 인원

  images: {
    main:     { type: String },                            // 대표 이미지 URL
    bedroom:  [{ type: String }],                          // 침실 이미지들
    bathroom: [{ type: String }],                          // 욕실 이미지들
    extra:    [{ type: String }],                          // 추가 이미지들
  },

  rooms: {
    bedroom:  { type: Number, default: 1 },                // 침실 수
    bed:      { type: Number, default: 1 },                // 침대 수
    bathroom: { type: Number, default: 1 },                // 욕실 수
  },

  amenities: [{ type: String }],                           // 편의시설 (와이파이/주차/에어컨 등)

  rating: {
    overall:       { type: Number, default: 0 },           // 전체 평점
    cleanliness:   { type: Number, default: 0 },           // 청결도
    accuracy:      { type: Number, default: 0 },           // 정확도
    checkIn:       { type: Number, default: 0 },           // 체크인
    communication: { type: Number, default: 0 },           // 의사소통
    location:      { type: Number, default: 0 },           // 위치
    value:         { type: Number, default: 0 },           // 가격대비 만족도
  },

  reviewCount:  { type: Number, default: 0 },              // 리뷰 수
  hostLanguage: [{ type: String }],                        // 호스트 언어
  isSuperHost:  { type: Boolean, default: false },         // 슈퍼호스트 여부
  instantBook:  { type: Boolean, default: false },         // 즉시 예약 가능
}, { timestamps: true });

const Accommodate = mongoose.model('Accommodate', accommodateSchema);

module.exports = Accommodate;
