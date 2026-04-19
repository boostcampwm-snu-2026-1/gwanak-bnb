import * as AccommodateRepository from '../repository/AccommodateRepository.js';

export const getAccommodations = async (destination) => {
    const query = destination ? { destination: new RegExp(destination, 'i') } : {};
    
    const results = await AccommodateRepository.findAllByDestination(query);
    
    if (!results) throw new Error("error fetching accommodations");
    
    return results;
};