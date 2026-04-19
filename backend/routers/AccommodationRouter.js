import express from "express"
import AccommodationService from "../services/AccommodationService.js"

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const { sido, sigungu, maxGuests } = req.query
    const results = await AccommodationService.searchAccommodations({ sido, sigungu, maxGuests })
    res.json(results)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
})

export default router