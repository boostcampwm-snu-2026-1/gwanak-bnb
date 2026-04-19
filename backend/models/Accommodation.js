import mongoose from "mongoose"

const roomSchema = new mongoose.Schema({
  name: String,
  beds: Number,
})

const accommodationSchema = new mongoose.Schema({
  title: String,
  location: {
    sido: String,
    sigungu: String,
  },
  price: Number,
  maxGuests: Number,
  child: Boolean,
  pet: Boolean,
  rating: Number,
  reviewCount: Number,
  rooms: [roomSchema],
  imageUrl: String,
})

const Accommodation = mongoose.model("Accommodation", accommodationSchema)

export default Accommodation