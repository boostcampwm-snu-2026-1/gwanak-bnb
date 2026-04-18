import { Router } from 'express'
import accommodationRoutes from './accommodationRoutes.js'
import healthRoutes from './healthRoutes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/accommodations', accommodationRoutes)

export default router
