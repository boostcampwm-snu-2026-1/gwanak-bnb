import { PLACES } from '../models/placeModel.js';

export function searchPlaces(req, res) {
  const { destination, adults = '0', children = '0', checkin, checkout } = req.query;
  const guestCount = Number(adults) + Number(children);

  if (!destination || guestCount <= 0) {
    return res.status(400).json({ error: 'destination and guest count are required' });
  }

  const normalizedDestination = destination.trim().toLowerCase();

  const matchedPlaces = PLACES.filter((place) => {
    const locationMatch = place.location.toLowerCase().includes(normalizedDestination);
    const titleMatch = place.title.toLowerCase().includes(normalizedDestination);
    const descriptionMatch = place.description.toLowerCase().includes(normalizedDestination);
    const capacityMatch = place.guestCapacity >= guestCount;

    return (locationMatch || titleMatch || descriptionMatch) && capacityMatch;
  });

  res.json({ results: matchedPlaces, metadata: { guestCount, destination, checkin, checkout } });
}
