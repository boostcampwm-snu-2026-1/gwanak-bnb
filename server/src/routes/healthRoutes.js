import { Router } from 'express'
import { getHealthStatus } from '../controllers/healthController.js'

const healthRoutes = Router()

healthRoutes.get('/', getHealthStatus)

export default healthRoutes
