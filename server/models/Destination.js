import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    address: {
      country: { type: String, required: true, trim: true },
      recipientName: { type: String },
      phone: { type: String, trim: true },

      fullAddress: { type: String, required: true },
      detailAddress: { type: String },
      city: {type: String},
      stateProvince: {type: String},
      postalCode: {type: String},
      latitude: { type: Number },
      longitude: { type: Number }      
    },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
    popularity: { type: Number, default: 0 },
    capacity: { type: Number, default: 1 },
    price: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 }
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    images: { type: [String], default: ["/image/defaultimg.png"] }
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;