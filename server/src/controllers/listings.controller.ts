import type { Request, Response } from 'express'
import { searchListingsForGuests } from '../services/listings.service.js'

function parseIntParam(v: unknown, fallback: number): number {
  if (v === undefined || v === null || v === '') return fallback
  const n = Number.parseInt(String(v), 10)
  return Number.isFinite(n) ? n : fallback
}

export async function getSearchListings(req: Request, res: Response): Promise<void> {
  const q = req.query
  const body = req.method === 'POST' ? (req.body as Record<string, unknown>) : {}

  const destinationId =
    (typeof q.destinationId === 'string' ? q.destinationId : undefined) ??
    (typeof body.destinationId === 'string' ? body.destinationId : undefined)

  const adults = parseIntParam(q.adults ?? body.adults, 0)
  const children = parseIntParam(q.children ?? body.children, 0)
  const infants = parseIntParam(q.infants ?? body.infants, 0)
  const pets = parseIntParam(q.pets ?? body.pets, 0)

  const checkIn =
    typeof q.checkIn === 'string'
      ? q.checkIn
      : typeof body.checkIn === 'string'
        ? body.checkIn
        : undefined
  const checkOut =
    typeof q.checkOut === 'string'
      ? q.checkOut
      : typeof body.checkOut === 'string'
        ? body.checkOut
        : undefined

  const result = await searchListingsForGuests({
    destinationId,
    adults,
    children,
    infants,
    pets,
    checkIn,
    checkOut,
  })

  if (!result.ok) {
    const status =
      result.error.code === 'MISSING_DESTINATION' || result.error.code === 'INVALID_GUESTS'
        ? 400
        : 400
    res.status(status).json({
      error: result.error.code,
      message: result.error.message,
    })
    return
  }

  res.json({
    listings: result.listings.map((l) => ({
      id: String(l._id),
      destinationId: l.destinationId,
      title: l.title,
      slug: l.slug,
      maxGuests: l.maxGuests,
      pricePerNight: l.pricePerNight,
      thumbnailUrl: l.thumbnailUrl,
      rating: l.rating,
      reviewCount: l.reviewCount,
      description: l.description,
    })),
  })
}
