const accommodationRepository = require('../repositories/accommodationRepository');

const accommodationService = {
  searchAccommodations: async (region, guests) => {
    const guestCount = (guests && guests > 0) ? guests : 0;
    const accommodations = await accommodationRepository.findByFilter(region, guestCount);

    if (!accommodations || accommodations.length === 0) console.log(`알림: ${region} 지역에 조건에 맞는 숙소가 없습니다.`);

    return accommodations;
  },

  getDetail: async (id) => {
    const accommodation = await accommodationRepository.findById(id);
    
    if (!accommodation) throw new Error('해당 숙소를 찾을 수 없습니다.');
    return accommodation;
  }
};

module.exports = accommodationService;