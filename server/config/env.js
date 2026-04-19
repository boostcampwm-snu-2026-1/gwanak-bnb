import dotenv from "dotenv";

dotenv.config();

const env = {
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  mongoUri:
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/gwanak-bnb",
  nodeEnv: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,
};

export default env;
