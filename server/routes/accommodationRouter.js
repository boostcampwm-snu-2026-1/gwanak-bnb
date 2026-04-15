import { Router } from 'express';

const router = Router();

router.get('/search', (req, res) => {
  res.json({ message: 'search endpoint ready' });
});

export default router;
