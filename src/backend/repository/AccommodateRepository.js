import Accommodate from '../models/Accommodate.js';

export const findAllByDestination = async (query) => {
    return await Accommodate.find(query);
};

export const countAll = async () => {
    return await Accommodate.countDocuments();
};