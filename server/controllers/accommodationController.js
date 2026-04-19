import Accommodation from '../models/Accommodation.js';

// GET /api/accommodations/search?location=서울&guests=2
export const searchAccommodations = async (req, res) => {
  const { location, guests } = req.query;

  // 필수 파라미터 체크
  if (!location || !guests) {
    return res.status(400).json({ message: 'location과 guests는 필수입니다.' });
  }

  try {
    const results = await Accommodation.find({
      // 지역명 부분 일치 검색 (대소문자 무시)
      location: { $regex: location, $options: 'i' },
      // 최대 인원이 요청 인원 이상인 숙소만
      maxGuests: { $gte: Number(guests) },
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: '서버 오류', error: err.message });
  }
};