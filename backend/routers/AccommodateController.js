const express = require('express');
const router = express.Router();
const accommodateService = require('../services/AccommodateService');

router.get('/', async (req, res) => {
  try {
    const results = await accommodateService.search(req.query);
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
