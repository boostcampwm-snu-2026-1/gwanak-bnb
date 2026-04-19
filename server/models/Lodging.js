import mongoose from "mongoose";

const lodgingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  maxGuests: { type: Number, required: true },
  beds: { type: Number, default: 1 },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  amenities: [{ type: String }],
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

lodgingSchema.index({ location: 1 });
lodgingSchema.index({ location: "text" });

const Lodging = mongoose.model("Lodging", lodgingSchema);

export default Lodging;