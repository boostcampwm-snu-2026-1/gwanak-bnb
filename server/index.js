import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import lodgingRoutes from "./routes/lodgingRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/lodgings", lodgingRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gwanakbnb";

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));