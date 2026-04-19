import { findAccommodationsByCondition } from '../repositories/accommodation.repository.js';

export const getAccommodations = async (location: string, guests: number) => {
  return await findAccommodationsByCondition(location, guests);
};