const accommodationRepository = require('../repositories/accommodationRepository');

const searchAccommodations = async ({ destination, guests }) => {
  const filter = {
    $or: [
      { 'address.sido': { $regex: destination, $options: 'i' } },
      { 'address.sigungu': { $regex: destination, $options: 'i' } },
      { 'address.detail': { $regex: destination, $options: 'i' } },
    ],
    'capacity.guests': { $gte: Number(guests) },
  };
  return accommodationRepository.search(filter);
};

module.exports = { searchAccommodations };
