import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  maxGuests: { type: Number, required: true },
  description: { type: String },
  rooms: { type: String },
  pricePerNight: { type: Number, required: true },
  totalPrice: { type: Number },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  images: [{ type: String }],
  badge: { type: String },
  extra: { type: String },
}, { timestamps: true });

export default mongoose.model('Listing', listingSchema);
