import Accommodation from '../models/accommodation.model.js'

async function searchAccommodations({ location, guests, checkIn, checkOut }) {
  const filter = {}

  if (location) {
    const regex = new RegExp(escapeRegex(location), 'i')
    filter.$or = [
      { 'location.city': regex },
      { 'location.region': regex },
      { 'location.fullAddress': regex },
      { title: regex },
    ]
  }

  if (typeof guests === 'number' && guests > 0) {
    filter.maxGuests = { $gte: guests }
  }

  const results = await Accommodation.find(filter).sort({ rating: -1, reviewCount: -1 }).lean()
  return results
}

function escapeRegex(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export default {
  searchAccommodations,
}
