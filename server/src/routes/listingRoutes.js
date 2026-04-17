import { Router } from 'express';
import { getListings } from '../controllers/listingController.js';

const listingRoutes = Router();

listingRoutes.get('/', getListings);

export default listingRoutes;
