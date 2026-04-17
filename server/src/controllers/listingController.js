import { searchListings } from '../services/listingService.js';

function toPositiveNumber(value) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function getListings(req, res) {
  const filters = {
    location: req.query.location?.trim() || undefined,
    category: req.query.category?.trim() || undefined,
    guests: toPositiveNumber(req.query.guests),
    minPrice: toPositiveNumber(req.query.minPrice),
    maxPrice: toPositiveNumber(req.query.maxPrice),
    checkIn: req.query.checkIn || undefined,
    checkOut: req.query.checkOut || undefined,
    sort: req.query.sort || 'recommended',
  };

  const result = searchListings(filters);

  res.json({
    success: true,
    ...result,
  });
}
