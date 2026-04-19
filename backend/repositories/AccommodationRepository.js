import Accommodation from "../models/Accommodation.js"

const findByFilter = async ({ sido, sigungu, maxGuests }) => {
  const filter = {}

  if (sido) filter["location.sido"] = sido
  if (sigungu) filter["location.sigungu"] = sigungu
  if (maxGuests) filter.maxGuests = { $gte: Number(maxGuests) }

  return await Accommodation.find(filter)
}

export default { findByFilter }