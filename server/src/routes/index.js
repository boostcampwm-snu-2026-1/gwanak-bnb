import { Router } from 'express';
import listingRoutes from './listingRoutes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'gwanak-bnb api is healthy',
    timestamp: new Date().toISOString(),
  });
});

router.use('/listings', listingRoutes);

export default router;
