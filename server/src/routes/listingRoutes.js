import { Router } from 'express'
import { searchListingsHandler } from '../controllers/listingController.js'

const router = Router()

router.get('/search', searchListingsHandler)

export default router
