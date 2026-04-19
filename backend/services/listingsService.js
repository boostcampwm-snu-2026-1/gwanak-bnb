import Listing from '../models/Listing.js';

export async function searchListings(location, guests) {
  return Listing.find({
    location: { $regex: location, $options: 'i' },
    maxGuests: { $gte: guests },
  }).sort({ rating: -1 });
}
