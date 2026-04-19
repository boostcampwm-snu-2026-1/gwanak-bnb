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
        const { locationId, guests } = req.query;
        const rooms = await Room.find({
            locationId: Number(locationId),
            "capacity.maxGuests": { $gte: Number(guests || 0) }
        });
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
});

app.listen(port, () => console.log(`http://localhost:${port}`));