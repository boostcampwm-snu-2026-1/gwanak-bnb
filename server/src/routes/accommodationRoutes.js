import { Router } from 'express'
import {
  getAccommodationDetail,
  getAccommodationList,
} from '../controllers/accommodationController.js'

const accommodationRoutes = Router()

accommodationRoutes.get('/', getAccommodationList)
accommodationRoutes.get('/:id', getAccommodationDetail)

export default accommodationRoutes
