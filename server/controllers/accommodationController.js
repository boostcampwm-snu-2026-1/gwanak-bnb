import { searchAccommodations } from '../services/accommodationService.js'

export async function search(req, res) {
  try {
    const { destination, guests } = req.query
    const results = await searchAccommodations({ destination, guests })
    res.json(results)
  } catch (err) {
    res.status(500).json({ message: '검색 중 오류가 발생했습니다.' })
  }
}
