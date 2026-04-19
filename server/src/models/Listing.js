import mongoose from 'mongoose'

const listingSchema = new mongoose.Schema(
  {
    listingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0
        },
        message: 'At least one image URL is required',
      },
    },
    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 0,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
    baths: {
      type: Number,
      required: true,
      min: 1,
    },
    nights: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'KRW',
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      required: true,
      min: 0,
    },
    isGuestFavorite: {
      type: Boolean,
      default: false,
    },
    isSuperhost: {
      type: Boolean,
      default: false,
    },
    dateLabel: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

listingSchema.index({ listingId: 1 }, { unique: true })
listingSchema.index({ location: 1, region: 1, country: 1 })
listingSchema.index({ maxGuests: 1 })

const Listing = mongoose.model('Listing', listingSchema)

export default Listing
