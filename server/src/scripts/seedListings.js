import dotenv from 'dotenv'
import connectDatabase from '../config/db.js'
import listingsSeed from '../data/listingsSeed.js'
import Listing from '../models/Listing.js'

dotenv.config()

async function seedListings() {
  try {
    await connectDatabase()

    await Listing.deleteMany({})
    await Listing.insertMany(listingsSeed)

    console.log(`Seeded ${listingsSeed.length} listings`)
    process.exit(0)
  } catch (error) {
    console.error('Failed to seed listings', error)
    process.exit(1)
  }
}

seedListings()
