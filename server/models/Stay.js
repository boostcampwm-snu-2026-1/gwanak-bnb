import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const staySchema = new mongoose.Schema(
  {
    badge: {
      type: String,
      required: true,
      trim: true,
    },
    baths: {
      type: Number,
      required: true,
      min: 1,
    },
    bedrooms: {
      type: Number,
      required: true,
      min: 1,
    },
    beds: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    distance: {
      type: String,
      required: true,
      trim: true,
    },
    gradient: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: {
      type: [String],
      default: [],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    maxGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    petFriendly: {
      type: Boolean,
      default: false,
    },
    pricePerNight: {
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
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    availability: {
      type: availabilitySchema,
      required: true,
    },
  },
  {
    collection: "stays",
    timestamps: true,
  },
);

staySchema.index({
  title: "text",
  location: "text",
  city: "text",
  district: "text",
  category: "text",
  keywords: "text",
});

const Stay = mongoose.model("Stay", staySchema);

export default Stay;
