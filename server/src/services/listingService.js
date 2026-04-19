import { findListings } from '../repositories/listingRepository.js';

export function searchListings(filters) {
  const listings = findListings(filters);

  return {
    total: listings.length,
    filters,
    listings,
  };
}
