import mongoose from 'mongoose'
import { MONGODB_URI } from '../config/env.js'

export async function connectDb(): Promise<void> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set')
  }
  mongoose.set('strictQuery', true)
  await mongoose.connect(MONGODB_URI)
}

export async function disconnectDb(): Promise<void> {
  await mongoose.disconnect()
}
