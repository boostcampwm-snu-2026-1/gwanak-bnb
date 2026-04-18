import { getAccommodations } from '../services/accommodationService.js'

export async function getAccommodationList(request, response) {
  const result = await getAccommodations(request.query)

  response.status(200).json(result)
}

export default {
  getAccommodationList,
}
