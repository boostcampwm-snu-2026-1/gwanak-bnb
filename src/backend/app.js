import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import * as AccommodateController from './controllers/AccommodateController.js'; 

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.post('/api/search', AccommodateController.searchRooms);

app.get('/', (req, res) => {
    res.send('backend is running');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});

export default app;