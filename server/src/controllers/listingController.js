import { searchListings } from '../services/listingService.js';

function toPositiveNumber(value) {
  if (value === undefined || value === null || value === '') {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function toStringArray(value) {
  if (Array.isArray(value)) {
    return value.flatMap((item) => item.split(',')).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }

  return undefined;
}

function toBooleanFlag(value) {
  return value === 'true' || value === '1' || value === true;
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
    amenities: toStringArray(req.query.amenities),
    instantBook: toBooleanFlag(req.query.instantBook),
    selfCheckIn: toBooleanFlag(req.query.selfCheckIn),
    freeCancellation: toBooleanFlag(req.query.freeCancellation),
    sort: req.query.sort || 'recommended',
  };

  const result = searchListings(filters);

  res.json({
    success: true,
    ...result,
  });
}
