import mongoose from "mongoose";
import env from "./env.js";

let connectionPromise;

async function connectDatabase() {
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(env.mongoUri);
  }

  return connectionPromise;
}

export default connectDatabase;
