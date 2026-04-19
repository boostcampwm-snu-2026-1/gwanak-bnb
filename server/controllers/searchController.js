import Place from '../models/placeModel.js';

export async function searchPlaces(req, res) {
  try {
    const {
      destination,
      adults = '0',
      children = '0',
      infants = '0',
      pets = '0',
      checkin,
      checkout
    } = req.query;

    // 필수 파라미터 검증
    if (!destination?.trim()) {
      return res.status(400).json({
        error: '여행지를 입력해주세요.',
        code: 'MISSING_DESTINATION'
      });
    }

    const totalGuests = Number(adults) + Number(children);
    if (totalGuests <= 0) {
      return res.status(400).json({
        error: '성인 또는 어린이 수를 선택해주세요.',
        code: 'INVALID_GUEST_COUNT'
      });
    }

    // 검색 조건 구성
    const searchCriteria = {
      destination: destination.trim(),
      adults: Number(adults),
      children: Number(children),
      infants: Number(infants),
      pets: Number(pets)
    };

    // MongoDB에서 검색
    const places = await Place.findBySearchCriteria(searchCriteria)
      .sort({ 'ratings.overall': -1 }) // 평점 높은 순
      .limit(50); // 최대 50개 결과

    // 응답 데이터 가공
    const results = places.map(place => ({
      id: place._id.toString(),
      title: place.title,
      location: `${place.location.city}${place.location.district ? ` ${place.location.district}` : ''}`,
      description: place.description,
      guestCapacity: place.capacity.maxGuests,
      maxInfants: place.capacity.maxInfants,
      allowPets: place.capacity.allowPets,
      bedrooms: place.details.bedrooms,
      beds: place.details.beds,
      price: place.pricing.basePrice,
      rating: place.ratings.overall,
      reviews: place.ratings.reviewCount,
      images: place.images.map(img => img.url),
      amenities: place.amenities,
      host: place.host
    }));

    res.json({
      results,
      metadata: {
        totalResults: results.length,
        searchCriteria,
        checkin,
        checkout
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: '검색 중 오류가 발생했습니다.',
      code: 'SEARCH_ERROR'
    });
  }
}
