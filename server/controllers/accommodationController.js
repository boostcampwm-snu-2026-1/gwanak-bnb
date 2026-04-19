const { searchAccommodations } = require('../services/accommodationService');

const search = async (req, res) => {
  try {
    const { destination, guests, checkin, checkout } = req.query;

    if (!destination || !guests) {
      return res.status(400).json({ success: false, message: 'destination and guests are required' });
    }

    const data = await searchAccommodations({ destination, guests });
    res.json({ success: true, data, total: data.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { search };
