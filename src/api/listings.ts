import { getApiBaseUrl } from './config'

export type ListingSummary = {
  id: string
  destinationId: string
  title: string
  slug: string
  maxGuests: number
  pricePerNight: number
  thumbnailUrl: string
  rating: number
  reviewCount: number
  description?: string
}

export type SearchListingsParams = {
  destinationId: string
  adults: number
  children: number
  infants: number
  pets: number
  checkIn?: string
  checkOut?: string
}

export type SearchListingsSuccess = {
  listings: ListingSummary[]
}

export type SearchListingsErrorBody = {
  error?: string
  message?: string
}

export async function searchListings(
  params: SearchListingsParams,
): Promise<SearchListingsSuccess> {
  const base = getApiBaseUrl()
  const qs = new URLSearchParams({
    destinationId: params.destinationId,
    adults: String(params.adults),
    children: String(params.children),
    infants: String(params.infants),
    pets: String(params.pets),
  })
  if (params.checkIn) qs.set('checkIn', params.checkIn)
  if (params.checkOut) qs.set('checkOut', params.checkOut)

  const res = await fetch(`${base}/listings/search?${qs.toString()}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  })

  const body = (await res.json()) as SearchListingsSuccess & SearchListingsErrorBody

  if (!res.ok) {
    const msg =
      typeof body.message === 'string'
        ? body.message
        : `검색 요청에 실패했습니다 (${res.status})`
    throw new Error(msg)
  }

  return { listings: body.listings ?? [] }
}
