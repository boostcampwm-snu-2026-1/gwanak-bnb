import { Router } from 'express';
import { searchAccommodations } from '../controllers/accommodation.controller.js';

const router = Router();

// GET /api/accommodations
router.get('/', searchAccommodations);

export default router;