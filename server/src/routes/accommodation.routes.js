import { Router } from 'express'
import accommodationController from '../controllers/accommodation.controller.js'

const router = Router()

router.get('/search', accommodationController.search)

export default router
