import Accommodation from '../models/Accommodation.js'

// destination을 포함하는 location, guests 이상의 capacity를 가진 숙소를 조회한다
export async function searchAccommodations({ destination, guests }) {
  const query = {}

  if (destination) {
    query.location = { $regex: destination, $options: 'i' }
  }
  if (guests && guests > 0) {
    query.capacity = { $gte: Number(guests) }
  }

  return Accommodation.find(query).sort({ rating: -1 })
}
