import { Router } from 'express';
import { searchAccommodations } from '../controllers/accommodationController.js';

const accommodationRouter = Router();

accommodationRouter.get('/search', searchAccommodations);

export { accommodationRouter };
