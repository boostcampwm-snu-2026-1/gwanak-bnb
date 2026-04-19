import * as AccommodateService from '../services/AccommodateService.js';

export const searchRooms = async (req, res) => {
    try {
        const { destination, travelers } = req.body;

        if (!destination || !travelers || travelers.adult === 0) {
            return res.status(400).json({
                status: 'error',
                message: '여행지와 성인 인원수는 필수 항목입니다.'
            });
        }
        
        const query = {
            destination: new RegExp(destination, 'i'),
            "capacity.adult": { $gte: Number(travelers.adult) },
            "capacity.child": { $gte: Number(travelers.child || 0) },
            "capacity.pet": { $gte: Number(travelers.pet || 0) }
        };

        const rooms = await AccommodateService.getAccommodations(query); 

        res.status(200).json({
            status: 'success',
            data: rooms,
        });
    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};