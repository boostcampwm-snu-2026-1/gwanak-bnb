const express = require('express');
const router = express.Router();
const accommodationService = require('../services/accommodationService');

router.get('/', async (req, res) => {
  try {
    const { region, guests } = req.query;
    const accommodations = await accommodationService.searchAccommodations(region, guests);
    res.status(200).json(accommodations);
  } catch (error) {
    res.status(500).json({ message: '숙소 검색 중 오류가 발생했습니다.', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const accommodation = await accommodationService.getDetail(id);
    
    res.status(200).json(accommodation);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;