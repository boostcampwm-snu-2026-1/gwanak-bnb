const service = require('../services/accommodation.service');

const search = async (req, res) => {
    const { city, district, guests, infant, pet } = req.query;

    if (!city || !guests) {
        return res.status(400).json({ message: '도시와 여행인원은 필수입니다.' });
    }

    try {
        const results = await service.search({ city, district, guests, infant, pet });
        console.log(`[검색] city=${city}, guests=${guests} → ${results.length}건`);
        res.json(results);
    } catch (err) {
        console.error('[검색 오류]', err);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }
};

module.exports = { search };
