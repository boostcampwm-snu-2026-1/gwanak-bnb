const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

export async function fetchListings({ destination, guestCount, checkIn, checkOut }) {
  const searchParams = new URLSearchParams({
    destination,
    guestCount: String(guestCount),
  })

  if (checkIn) {
    searchParams.set('checkIn', checkIn)
  }

  if (checkOut) {
    searchParams.set('checkOut', checkOut)
  }

  const response = await fetch(`${API_BASE_URL}/api/listings/search?${searchParams.toString()}`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || '검색 요청에 실패했습니다.')
  }

  return data
}
