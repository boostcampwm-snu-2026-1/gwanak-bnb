import { Accommodation } from '../models/Accommodation.js';

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function findAccommodationsBySearch({ destination, guests }) {
  const safeDestination = escapeRegExp(destination.trim());

  return Accommodation.find({
    maxGuests: { $gte: guests },
    $or: [
      { destination: { $regex: safeDestination, $options: 'i' } },
      { locationLabel: { $regex: safeDestination, $options: 'i' } },
      { title: { $regex: safeDestination, $options: 'i' } },
    ],
  })
    .sort({ rating: -1, reviewCount: -1, price: 1 })
    .lean();
}

export { findAccommodationsBySearch };
