import Accommodation from '../models/accommodation.js'

export async function findAccommodations({ filter, page, limit, sort }) {
  const skip = (page - 1) * limit

  return Accommodation.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .lean()
}

export async function countAccommodations(filter) {
  return Accommodation.countDocuments(filter)
}

export default {
  findAccommodations,
  countAccommodations,
}
