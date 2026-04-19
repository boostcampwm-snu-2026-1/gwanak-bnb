import Lodging from "../models/Lodging.js";

export const searchLodgings = async (req, res) => {
  try {
    const { location, guests } = req.query;
    
    const query = {};
    
    if (location) {
      query.$or = [
        { location: { $regex: location, $options: 'i' } },
        { country: { $regex: location, $options: 'i' } },
      ];
    }
    
    if (guests) {
      query.maxGuests = { $gte: parseInt(guests) };
    }
    
    const lodgings = await Lodging.find(query).limit(20);
    res.json(lodgings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLodgings = async (req, res) => {
  try {
    const lodgings = await Lodging.find().limit(20);
    res.json(lodgings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};