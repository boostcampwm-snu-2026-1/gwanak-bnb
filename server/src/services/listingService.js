import Listing from '../models/Listing.js'

function createHttpError(message, statusCode) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatListing(listing) {
  return {
    id: listing.listingId,
    title: listing.title,
    subtitle: listing.subtitle,
    location: listing.location,
    region: listing.region,
    country: listing.country,
    image: listing.imageUrls[0],
    imageUrls: listing.imageUrls,
    date: listing.dateLabel,
    description: listing.description,
    capacityLabel: `최대 게스트 ${listing.maxGuests}명`,
    roomLabel: `침실 ${listing.bedrooms}개 · 침대 ${listing.beds}개 · 욕실 ${listing.baths}개`,
    price: listing.price,
    priceLabel: `총액 ${formatCurrency(listing.price, listing.currency)}`,
    rating: listing.rating,
    reviewCount: listing.reviewCount,
    ratingLabel: `★ ${listing.rating.toFixed(2)} (${listing.reviewCount})`,
    nights: listing.nights,
    isGuestFavorite: listing.isGuestFavorite,
    isSuperhost: listing.isSuperhost,
  }
}

export async function searchListings(query) {
  const destination = query.destination?.trim() || ''
  const guestCount = Number(query.guestCount)
  const checkIn = query.checkIn || null
  const checkOut = query.checkOut || null

  if (!destination) {
    throw createHttpError('destination is required', 400)
  }

  if (!Number.isInteger(guestCount) || guestCount < 1) {
    throw createHttpError('guestCount must be a positive integer', 400)
  }

  const destinationRegex = new RegExp(escapeRegExp(destination), 'i')

  const items = await Listing.find({
    maxGuests: { $gte: guestCount },
    $or: [
      { location: destinationRegex },
      { region: destinationRegex },
      { country: destinationRegex },
      { title: destinationRegex },
      { subtitle: destinationRegex },
      { description: destinationRegex },
    ],
  })
    .sort({ rating: -1, reviewCount: -1, price: 1 })
    .lean()

  return {
    items: items.map(formatListing),
    totalCount: items.length,
    filters: {
      destination,
      guestCount,
      checkIn,
      checkOut,
    },
  }
}
