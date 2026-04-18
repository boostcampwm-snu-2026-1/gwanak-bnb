import mongoose from 'mongoose'

const guestRangeSchema = new mongoose.Schema(
  {
    min: {
      type: Number,
      required: true,
      min: 0,
    },
    max: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
)

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      country: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      detail: {
        type: String,
        required: true,
        trim: true,
      },
    },
    pricePerNight: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    imageUrls: {
      type: [String],
      default: [],
    },
    guestCapacity: {
      primary: {
        type: guestRangeSchema,
        required: true,
      },
      infant: {
        type: guestRangeSchema,
        required: true,
      },
      pet: {
        type: guestRangeSchema,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
)

accommodationSchema.index({ title: 'text', 'address.country': 'text', 'address.city': 'text' })

const Accommodation =
  mongoose.models.Accommodation ||
  mongoose.model('Accommodation', accommodationSchema)

export default Accommodation
