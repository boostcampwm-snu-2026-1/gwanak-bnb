import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    region: { type: String, required: true },
    country: { type: String, default: '대한민국' },
    fullAddress: { type: String },
  },
  { _id: false }
)

const accommodationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    location: { type: locationSchema, required: true },
    pricePerNight: { type: Number, required: true, min: 0 },
    maxGuests: { type: Number, required: true, min: 1 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    amenities: { type: [String], default: [] },
    isSuperhost: { type: Boolean, default: false },
  },
  { timestamps: true }
)

accommodationSchema.index({ 'location.city': 1 })
accommodationSchema.index({ 'location.region': 1 })
accommodationSchema.index({ maxGuests: 1 })

const Accommodation = mongoose.model('Accommodation', accommodationSchema)

export default Accommodation
