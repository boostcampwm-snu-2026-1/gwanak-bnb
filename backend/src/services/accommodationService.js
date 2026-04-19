import { findAccommodationsBySearch } from '../repositories/accommodationRepository.js';
import { HttpError } from '../utils/HttpError.js';

async function searchAccommodationList(query) {
  const destination = query.destination?.trim();
  const guests = Number(query.guests);
  const checkIn = query.checkIn?.trim() || null;
  const checkOut = query.checkOut?.trim() || null;

  if (!destination) {
    throw new HttpError(400, 'destination은 필수입니다.');
  }

  if (!Number.isInteger(guests) || guests < 1) {
    throw new HttpError(400, 'guests는 1 이상의 정수여야 합니다.');
  }

  const accommodations = await findAccommodationsBySearch({
    destination,
    guests,
    checkIn,
    checkOut,
  });

  return {
    filters: {
      destination,
      guests,
      checkIn,
      checkOut,
    },
    meta: {
      totalCount: accommodations.length,
    },
    data: accommodations,
  };
}

export { searchAccommodationList };
