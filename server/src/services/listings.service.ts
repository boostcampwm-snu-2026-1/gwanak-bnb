import type { ListingLean } from '../repositories/listings.repository.js'
import { searchListings } from '../repositories/listings.repository.js'

export type SearchParams = {
  destinationId: string | undefined
  adults: number
  children: number
  infants: number
  pets: number
  checkIn: string | undefined
  checkOut: string | undefined
}

export type SearchValidationError = {
  code: 'MISSING_DESTINATION' | 'INVALID_GUESTS' | 'INVALID_QUERY'
  message: string
}

/** 숙소 수용 인원: 성인+아동만 반영(유아·반려동물은 별도 정책 없이 수용 인원에서 제외) */
export function totalStayingGuests(adults: number, children: number): number {
  return adults + children
}

export function validateSearchParams(
  params: SearchParams,
): SearchValidationError | null {
  if (
    !params.destinationId ||
    typeof params.destinationId !== 'string' ||
    params.destinationId.trim() === ''
  ) {
    return {
      code: 'MISSING_DESTINATION',
      message: '여행지(destinationId)는 필수입니다.',
    }
  }

  const adults = Number.isFinite(params.adults) ? params.adults : NaN
  const children = Number.isFinite(params.children) ? params.children : NaN
  if (adults < 0 || children < 0 || Number.isNaN(adults) || Number.isNaN(children)) {
    return {
      code: 'INVALID_QUERY',
      message: 'adults·children은 0 이상의 숫자여야 합니다.',
    }
  }

  const staying = totalStayingGuests(adults, children)
  if (staying < 1) {
    return {
      code: 'INVALID_GUESTS',
      message: '여행 인원(성인+아동)은 1명 이상이어야 합니다.',
    }
  }

  return null
}

export async function searchListingsForGuests(params: SearchParams) {
  const err = validateSearchParams(params)
  if (err) {
    return { ok: false as const, error: err }
  }

  const minGuests = totalStayingGuests(params.adults, params.children)

  // 날짜는 선택: 예약 컬렉션 없이 전달만 받음(추후 확장)
  void params.checkIn
  void params.checkOut
  void params.infants
  void params.pets

  const listings: ListingLean[] = await searchListings({
    destinationId: params.destinationId!.trim(),
    minGuests,
  })

  return { ok: true as const, listings }
}
