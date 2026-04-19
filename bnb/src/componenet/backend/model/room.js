import mongoose from "mongoose";

// 모델 정의
const RoomSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    
    locationId: { type: Number, required: true },

    price: { type: Number, required: true },
    roomType: { type: String, enum: ['아파트', '주택', '호텔'] },

    capacity: {
        maxGuests: { type: Number, required: true },
        bedrooms: Number,
        beds: Number,
        bathrooms: Number
    },

    reservedDate: [{
        startDate: Date,
        endDate: Date
    }],

    images: [String]
});

export const Room = mongoose.model('Room', RoomSchema);