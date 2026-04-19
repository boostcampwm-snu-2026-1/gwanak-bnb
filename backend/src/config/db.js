import mongoose from 'mongoose';
import { env } from './env.js';

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  if (!env.mongodbUri) {
    throw new Error('MONGODB_URI 환경 변수가 설정되지 않았습니다.');
  }

  await mongoose.connect(env.mongodbUri, {
    dbName: 'gwanakbnb',
  });

  isConnected = true;
  return mongoose.connection;
}

async function disconnectFromDatabase() {
  if (!isConnected) {
    return;
  }

  await mongoose.disconnect();
  isConnected = false;
}

export { connectToDatabase, disconnectFromDatabase };
