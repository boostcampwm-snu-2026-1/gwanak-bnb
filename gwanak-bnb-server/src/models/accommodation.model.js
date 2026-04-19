const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    country:  { type: String, enum: ['대한민국'], default: '대한민국' },
    city:     { type: String, enum: ['서울', '부산', '제주', '인천', '대구', '광주', '대전', '경주'], required: true },
    district: { type: String, required: true },
    address:  { type: String, required: true },
}, { _id: false });

const accommodationSchema = new mongoose.Schema({
    name:          { type: String, required: true },
    minGuests:     { type: Number, required: true },
    maxGuests:     { type: Number, required: true },
    infantAllowed: { type: Boolean, default: false },
    petAllowed:    { type: Boolean, default: false },
    region:        { type: regionSchema, required: true },
    pricePerNight: { type: Number, required: true },
    images:        { type: [String], default: [] },
    description:   { type: String, default: '' },
    amenities:     { type: [String], default: [] },
    rating:        { type: Number, default: 0 },
    reviewCount:   { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Accommodation', accommodationSchema);
