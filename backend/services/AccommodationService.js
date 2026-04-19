import AccommodationRepository from "../repositories/AccommodationRepository.js"

const searchAccommodations = async ({ sido, sigungu, maxGuests }) => {
  const results = await AccommodationRepository.findByFilter({ sido, sigungu, maxGuests })

  if (!results.length) {
    throw new Error("검색 결과가 없습니다.")
  }

  return results
}

export default { searchAccommodations }