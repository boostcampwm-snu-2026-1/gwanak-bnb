import Accommodation from '../models/Accommodation.js';

export async function searchAccommodations({ location, guests }) {
  const query = {};

  if (location) {
    query.$or = [
      { 'location.province': { $regex: location, $options: 'i' } },
      { 'location.city': { $regex: location, $options: 'i' } },
    ];
  }

  if (guests) {
    query['capacity.maxGuests'] = { $gte: Number(guests) };
  }

  return Accommodation.find(query);
}
