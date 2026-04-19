import * as listingsService from '../services/listingsService.js';

export async function searchListings(req, res) {
  try {
    const { location, guests } = req.query;

    if (!location || !guests) {
      return res.status(400).json({ message: '여행지와 여행인원은 필수입니다.' });
    }

    const guestsNum = parseInt(guests, 10);
    if (isNaN(guestsNum) || guestsNum < 1) {
      return res.status(400).json({ message: '유효하지 않은 여행인원입니다.' });
    }

    const listings = await listingsService.searchListings(location, guestsNum);
    return res.json(listings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
}
