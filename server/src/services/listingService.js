export async function searchListings(query) {
  const destination = query.destination?.trim() || ''
  const guestCount = Number(query.guestCount) || 0

  return {
    items: [],
    totalCount: 0,
    filters: {
      destination,
      guestCount,
      checkIn: query.checkIn || null,
      checkOut: query.checkOut || null,
    },
    message: 'Search service placeholder response',
  }
}
