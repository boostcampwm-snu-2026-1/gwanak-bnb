import mongoose, { Schema, Document } from 'mongoose';

export interface IAccommodation extends Document {
  name: string;
  location: string;
  max_guests: number;
  price_per_night: number;
  rating: number;
  review_count: number;
  image_url: string;
}

const accommodationSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  max_guests: { type: Number, required: true },
  price_per_night: { type: Number, required: true },
  rating: { type: Number, required: true },
  review_count: { type: Number, required: true },
  image_url: { type: String, required: true }
});

export default mongoose.models.Accommodation || mongoose.model<IAccommodation>('Accommodation', accommodationSchema);