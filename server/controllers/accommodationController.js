import { searchAccommodations } from '../services/accommodationService.js';

export async function search(req, res) {
  const { location, guests } = req.query;

  if (!location || !guests) {
    return res.status(400).json({ error: '여행지와 인원수는 필수입니다.' });
  }

  const results = await searchAccommodations({ location, guests });
  res.json(results);
}
