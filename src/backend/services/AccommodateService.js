import * as AccommodateRepository from '../repository/AccommodateRepository.js';

export const getAccommodations = async (query) => {
    const results = await AccommodateRepository.findAllByDestination(query);
    
    if (!results) throw new Error("error fetching accommodations");
    
    return results;
};