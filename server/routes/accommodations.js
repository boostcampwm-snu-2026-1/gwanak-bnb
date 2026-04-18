// server/routes/accommodations.js
const express = require('express');
const router = express.Router();
const Accommodation = require('../models/Accommodation'); // DB 모델 불러오기

// 프론트엔드에서 GET 요청이 오면 실행될 코드
router.get('/', async (req, res) => {
  try {
    // 1. 프론트엔드가 보낸 검색 조건 받기 (예: ?location=제주&guests=2)
    const { location, guests } = req.query;
    
    // 2. 창고(DB)를 뒤질 '검색 조건' 만들기
    let query = {};

    // 여행지가 입력되었다면? (포함되는 글자 찾기)
    if (location) {
      // RegExp는 정규표현식으로, '제주'만 쳐도 '제주도', '제주특별자치도'를 다 찾아줍니다.
      query.location = new RegExp(location, 'i'); 
    }

    // 인원수가 입력되었다면?
    if (guests) {
      // $gte는 Greater Than or Equal(크거나 같다)의 뜻입니다.
      // 수용 인원(maxGuests)이 요청한 인원(guests)보다 크거나 같은 숙소만 찾습니다.
      query.maxGuests = { $gte: Number(guests) }; 
    }

    // 3. 조건에 맞는 숙소를 DB에서 찾아오기
    const results = await Accommodation.find(query);
    
    // 4. 찾은 결과를 프론트엔드에 JSON 형태로 보내주기
    res.json(results);

  } catch (error) {
    console.error('검색 중 에러 발생:', error);
    res.status(500).json({ message: '서버에서 오류가 발생했습니다.' });
  }
});

module.exports = router;