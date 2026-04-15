import { Router } from 'express';
import Accommodation from '../models/Accommodation.js';

const router = Router();

router.get('/locations', async (req, res) => {
  const accommodations = await Accommodation.find({}, 'location');
  const locationSet = new Map();

  accommodations.forEach((acc) => {
    const { province, city } = acc.location;
    const key = `${province}-${city}`;
    if (!locationSet.has(key)) {
      locationSet.set(key, { title: `${city}, ${province}`, description: `${city} 지역 숙소` });
    }
  });

  const locations = [...locationSet.values()].map((loc, i) => ({
    id: String(i + 1),
    ...loc,
  }));

  res.json(locations);
});

router.get('/search', (req, res) => {
  res.json({ message: 'search endpoint ready' });
});

export default router;
