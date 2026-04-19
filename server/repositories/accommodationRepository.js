const Accommodation = require('../models/Accommodation');

const search = async (filter) => {
  return Accommodation.find(filter).lean();
};

const findById = async (id) => {
  return Accommodation.findById(id).lean();
};

module.exports = { search, findById };
