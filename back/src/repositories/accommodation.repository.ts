import Accommodation from '../models/Accommodation.js';

export const findAccommodationsByCondition = async (location: string, guests: number) => {
  return await Accommodation.find({
    location: location,
    max_guests: { $gte: guests } // 요청된 인원 수 이상 수용 가능한 숙소
  });
};