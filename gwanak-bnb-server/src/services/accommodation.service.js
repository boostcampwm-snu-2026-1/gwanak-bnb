const repository = require('../repositories/accommodation.repository');

const search = ({ city, district, guests, infant, pet }) => {
    return repository.findBySearchCondition({ city, district, guests, infant, pet });
};

module.exports = { search };
