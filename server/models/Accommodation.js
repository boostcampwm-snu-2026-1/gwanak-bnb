const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  region: { 
    type: String, 
    required: true, 
    index: true
  },
  price: { 
    type: Number, 
    required: true 
  },
  capacity: {
    maxGuests: { 
      type: Number, 
      required: true 
    },
  },
  images: [{ 
    type: String 
  }],
  amenities: [{ 
    type: String 
  }],
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Accommodation', accommodationSchema);