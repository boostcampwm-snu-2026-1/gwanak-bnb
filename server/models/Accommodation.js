import mongoose from 'mongoose'

const accommodationSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  location: { type: String, required: true }, // 도시명 (검색 필터 기준)
  address:  { type: String },
  price:    { type: Number, required: true },  // 1박 가격 (원)
  capacity: { type: Number, required: true },  // 최대 수용 인원
  rating:   { type: Number, default: 4.5 },
  description: { type: String },
}, { timestamps: true })

export default mongoose.model('Accommodation', accommodationSchema)
