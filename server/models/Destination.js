import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
    popularity: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;