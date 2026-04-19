import mongoose from 'mongoose';

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    locationLabel: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
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
    maxGuests: {
      type: Number,
      required: true,
      min: 1,
      index: true,
    },
    bedroomCount: {
      type: Number,
      required: true,
      min: 0,
    },
    bedCount: {
      type: Number,
      required: true,
      min: 1,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    badges: {
      type: [String],
      default: [],
    },
    seedKey: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

accommodationSchema.index({
  destination: 'text',
  locationLabel: 'text',
  title: 'text',
});

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

export { Accommodation };
