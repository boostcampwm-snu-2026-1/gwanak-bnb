const Accommodation = require('../models/accommodation.model');

const findBySearchCondition = ({ city, district, guests, infant, pet }) => {
    const query = {};

    if (city)     query['region.city']     = { $regex: city, $options: 'i' };
    if (district) query['region.district'] = { $regex: district, $options: 'i' };

    if (guests) {
        query.minGuests = { $lte: Number(guests) };
        query.maxGuests = { $gte: Number(guests) };
    }

    if (infant === 'true')  query.infantAllowed = true;
    if (pet    === 'true')  query.petAllowed    = true;

    return Accommodation.find(query);
};

module.exports = { findBySearchCondition };
