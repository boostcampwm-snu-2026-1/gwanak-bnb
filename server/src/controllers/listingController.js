import { searchListings } from '../services/listingService.js'

export async function searchListingsHandler(request, response, next) {
  try {
    const result = await searchListings(request.query)
    response.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
