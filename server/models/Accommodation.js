const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  overall: { type: Number, min: 0, max: 5, default: 0 },
  cleanliness: { type: Number, min: 0, max: 5, default: 0 },
  accuracy: { type: Number, min: 0, max: 5, default: 0 },
  checkin: { type: Number, min: 0, max: 5, default: 0 },
  communication: { type: Number, min: 0, max: 5, default: 0 },
  location: { type: Number, min: 0, max: 5, default: 0 },
  value: { type: Number, min: 0, max: 5, default: 0 },
}, { _id: false });

const addressSchema = new mongoose.Schema({
  sido: { type: String, required: true },
  sigungu: { type: String, required: true },
  detail: { type: String, default: '' },
}, { _id: false });

const imagesSchema = new mongoose.Schema({
  thumbnail: { type: String, default: '' },
  bedroom: { type: [String], default: [] },
  bathroom: { type: [String], default: [] },
  extra: { type: [String], default: [] },
}, { _id: false });

const capacitySchema = new mongoose.Schema({
  guests: { type: Number, required: true },
  bedrooms: { type: Number, default: 1 },
  beds: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
}, { _id: false });

const accommodationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  address: { type: addressSchema, required: true },
  capacity: { type: capacitySchema, required: true },
  price: { type: Number, required: true },
  accommodationType: {
    type: String,
    enum: ['아파트', '단독주택', '독채', '게스트하우스', '호텔', '펜션', '한옥', '빌라', '원룸'],
    default: '아파트',
  },
  buildingType: {
    type: String,
    enum: ['아파트', '주택', '별채', '부티크호텔', '부티크숙소', '기타'],
    default: '아파트',
  },
  images: { type: imagesSchema, default: () => ({}) },
  amenities: { type: [String], default: [] },
  hostLanguages: { type: [String], default: ['한국어'] },
  accessibilityFeatures: { type: [String], default: [] },
  instantBook: { type: Boolean, default: false },
  rating: { type: ratingSchema, default: () => ({}) },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

accommodationSchema.index({ 'address.sido': 1, 'address.sigungu': 1 });
accommodationSchema.index({ 'capacity.guests': 1 });

module.exports = mongoose.model('Accommodation', accommodationSchema);
