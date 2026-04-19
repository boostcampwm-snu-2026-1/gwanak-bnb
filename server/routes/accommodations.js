import { Router } from 'express'
import { search } from '../controllers/accommodationController.js'

const router = Router()

router.get('/', search)

export default router
