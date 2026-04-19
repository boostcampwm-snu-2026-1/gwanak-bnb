import 'dotenv/config'
import mongoose from 'mongoose'
import { connectToMongoDB } from '../config/db.js'
import Accommodation from '../models/accommodation.js'
import ACCOMMODATION_SEEDS from '../seeds/accommodations.js'

async function seedAccommodations() {
  try {
    await connectToMongoDB()

    await Accommodation.deleteMany({})
    const insertedAccommodations = await Accommodation.insertMany(
      ACCOMMODATION_SEEDS,
    )

    console.log(
      `Seed completed: ${insertedAccommodations.length} accommodations inserted`,
    )
  } catch (error) {
    console.error('Accommodation seed failed:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedAccommodations()
