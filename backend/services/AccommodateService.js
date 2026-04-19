const accommodateRepository = require('../repository/AccommodateRepository');

const search = async (query) => {
  const { city, guests } = query;

  const filter = {};

  if (city && city.trim()) {
    const tokens = city.trim().split(/\s+/);
    filter.$and = tokens.map((token) => ({
      $or: [
        { 'address.city': { $regex: token, $options: 'i' } },
        { 'address.district': { $regex: token, $options: 'i' } },
        { 'address.detail': { $regex: token, $options: 'i' } },
      ],
    }));
  }

  if (guests) {
    filter.capacity = { $gte: Number(guests) };
  }

  return await accommodateRepository.findAll(filter);
};

module.exports = { search };
