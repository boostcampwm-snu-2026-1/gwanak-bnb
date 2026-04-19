import * as AccommodateService from '../services/AccommodateService.js';

export const searchRooms = async (req, res) => {
    try {
        const { destination } = req.body;
        
        const data = await AccommodateService.getAccommodations(destination);
        
        res.json({ status: 'success', count: data.length, data });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};