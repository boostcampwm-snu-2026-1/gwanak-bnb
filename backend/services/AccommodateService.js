const accommodateRepository = require('../repository/AccommodateRepository');

const search = async (query) => {
  const { city, guests } = query;

  const filter = {};

  if (city) {
    filter['address.city'] = { $regex: city, $options: 'i' };
  }

  if (guests) {
    filter.capacity = { $gte: Number(guests) };
  }

  return await accommodateRepository.findAll(filter);
};

module.exports = { search };
