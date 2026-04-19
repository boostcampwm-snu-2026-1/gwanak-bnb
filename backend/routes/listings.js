import { Router } from 'express';
import { searchListings } from '../controllers/listingsController.js';

const router = Router();

router.get('/', searchListings);

export default router;
