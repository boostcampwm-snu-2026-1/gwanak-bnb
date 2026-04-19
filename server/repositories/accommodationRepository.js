const Accommodation = require('../models/Accommodation');

const accommodationRepository = {
  findAll: async () => {return await Accommodation.find();},

  findByFilter: async (region, guests) => {
    const query = {};

    if (region && region !== '전체') query.region = region;
    if (guests) query['capacity.maxGuests'] = { $gte: Number(guests) };

    return await Accommodation.find(query);
  },

  findById: async (id) => {return await Accommodation.findById(id);}
};

module.exports = accommodationRepository;