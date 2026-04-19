import { searchAccommodationList } from '../services/accommodationService.js';

async function searchAccommodations(request, response, next) {
  try {
    const result = await searchAccommodationList(request.query);

    response.status(200).json({
      message: '숙소 검색에 성공했습니다.',
      ...result,
    });
  } catch (error) {
    next(error);
  }
}

export { searchAccommodations };
