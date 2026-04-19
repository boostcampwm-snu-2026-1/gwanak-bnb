const Accommodate = require('../models/Accommodate');

const findAll = async (filter) => {
  return await Accommodate.find(filter);
};

const findById = async (id) => {
  return await Accommodate.findById(id);
};

module.exports = { findAll, findById };
