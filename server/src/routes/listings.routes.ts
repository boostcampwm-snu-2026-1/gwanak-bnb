import { Router } from 'express'
import { getSearchListings } from '../controllers/listings.controller.js'

export const listingsRouter = Router()

listingsRouter.get('/search', getSearchListings)
listingsRouter.post('/search', getSearchListings)
