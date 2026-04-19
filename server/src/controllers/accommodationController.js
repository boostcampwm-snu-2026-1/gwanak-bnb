import {
  getAccommodationById,
  getAccommodations,
} from '../services/accommodationService.js'

export async function getAccommodationList(request, response, next) {
  try {
    const result = await getAccommodations(request.query)

    response.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export async function getAccommodationDetail(request, response, next) {
  try {
    const result = await getAccommodationById(request.params.id)

    response.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export default {
  getAccommodationList,
  getAccommodationDetail,
}
