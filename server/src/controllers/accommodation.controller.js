import accommodationService from '../services/accommodation.service.js'

async function search(req, res, next) {
  try {
    const { location, guests, checkIn, checkOut } = req.query

    if (!location || typeof location !== 'string' || location.trim() === '') {
      return res.status(400).json({ message: 'location is required' })
    }

    const guestsNum = Number(guests)
    if (!Number.isInteger(guestsNum) || guestsNum < 1) {
      return res.status(400).json({ message: 'guests must be a positive integer' })
    }

    const results = await accommodationService.searchAccommodations({
      location: location.trim(),
      guests: guestsNum,
      checkIn,
      checkOut,
    })

    res.json({ count: results.length, results })
  } catch (err) {
    next(err)
  }
}

export default {
  search,
}
