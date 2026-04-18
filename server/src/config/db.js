import mongoose from 'mongoose'

export async function connectToMongoDB() {
  const mongoDbUri = process.env.MONGODB_URI

  if (!mongoDbUri) {
    throw new Error('MONGODB_URI is not defined')
  }

  await mongoose.connect(mongoDbUri)

  console.log(`MongoDB connected: ${mongoose.connection.host}`)
}

export default connectToMongoDB
