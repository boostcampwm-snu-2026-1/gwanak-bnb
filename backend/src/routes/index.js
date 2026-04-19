import { Router } from 'express';
import { accommodationRouter } from './accommodationRoutes.js';

const apiRouter = Router();

apiRouter.use('/accommodations', accommodationRouter);

export { apiRouter };
