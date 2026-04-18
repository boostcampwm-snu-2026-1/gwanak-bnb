import { Router } from 'express'
import { getAccommodationList } from '../controllers/accommodationController.js'

const accommodationRoutes = Router()

accommodationRoutes.get('/', getAccommodationList)

export default accommodationRoutes
