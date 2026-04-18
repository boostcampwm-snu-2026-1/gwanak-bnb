import {
  countAccommodations,
  findAccommodations,
} from '../repositories/accommodationRepository.js'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10
const MAX_LIMIT = 50

function parsePositiveInteger(value, fallbackValue) {
  const parsedValue = Number.parseInt(value, 10)

  if (Number.isNaN(parsedValue) || parsedValue <= 0) {
    return fallbackValue
  }

  return parsedValue
}

function buildDestinationFilter(destination) {
  if (!destination?.trim()) {
    return null
  }

  const searchPattern = new RegExp(destination.trim(), 'i')

  return {
    $or: [
      { title: searchPattern },
      { 'address.country': searchPattern },
      { 'address.city': searchPattern },
      { 'address.detail': searchPattern },
    ],
  }
}

function buildGuestFilter(field, guestCount) {
  if (guestCount === null) {
    return null
  }

  return {
    [`guestCapacity.${field}.min`]: { $lte: guestCount },
    [`guestCapacity.${field}.max`]: { $gte: guestCount },
  }
}

function buildAccommodationFilter(query) {
  const destinationFilter = buildDestinationFilter(query.destination)
  const primaryGuestCount = parsePositiveInteger(query.primaryGuests, null)
  const infantGuestCount = parsePositiveInteger(query.infantGuests, null)
  const petGuestCount = parsePositiveInteger(query.petGuests, null)

  return {
    ...(destinationFilter ?? {}),
    ...(buildGuestFilter('primary', primaryGuestCount) ?? {}),
    ...(buildGuestFilter('infant', infantGuestCount) ?? {}),
    ...(buildGuestFilter('pet', petGuestCount) ?? {}),
  }
}

export async function getAccommodations(query = {}) {
  const page = parsePositiveInteger(query.page, DEFAULT_PAGE)
  const limit = Math.min(
    parsePositiveInteger(query.limit, DEFAULT_LIMIT),
    MAX_LIMIT,
  )
  const filter = buildAccommodationFilter(query)
  const sort = { createdAt: -1 }

  const [accommodations, totalCount] = await Promise.all([
    findAccommodations({ filter, page, limit, sort }),
    countAccommodations(filter),
  ])

  return {
    data: accommodations,
    meta: {
      page,
      limit,
      totalCount,
      totalPages: Math.ceil(totalCount / limit) || 1,
    },
  }
}

export default {
  getAccommodations,
}
