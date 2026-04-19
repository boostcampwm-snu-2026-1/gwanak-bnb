import express from "express";
import cors from "cors";
import 'dotenv/config';
import { Room } from './model/room.js';
import { LOCATIONS } from "../../data/location.js";
import mongoose from "mongoose";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI);

app.get('/api/search', async (req, res) => {
    try {
        const { locationId, guests, checkIn, checkOut } = req.query;
        let query = {
            locationId: Number(locationId),
            "capacity.maxGuests": { $gte: Number(guests || 0) }
        };

        // 날짜 필터링: 선택한 기간이 기존 예약(reservedDate)과 겹치지 않는 숙소만 선택
        if (checkIn && checkOut) {
            const start = new Date(checkIn);
            const end = new Date(checkOut);

            query.reservedDate = {
                $not: {
                    $elemMatch: {
                        startDate: { $lt: end },
                        endDate: { $gt: start }
                    }
                }
            };
        }

        const rooms = await Room.find(query);
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

app.listen(port, () => console.log(`http://localhost:${port}`));