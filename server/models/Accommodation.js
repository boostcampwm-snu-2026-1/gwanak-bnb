import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: {
      province: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String },
      address: { type: String },
    },
    capacity: {
      maxGuests: { type: Number, required: true },
      maxInfants: { type: Number, default: 0 },
      petsAllowed: { type: Boolean, default: false },
      bedrooms: { type: Number, default: 1 },
      beds: { type: Number, default: 1 },
      bathrooms: { type: Number, default: 1 },
    },
    roomType: {
      type: String,
      enum: ['entire', 'private', 'shared'],
      default: 'entire',
    },
    amenities: [String],
    images: [String],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

export default Accommodation;
