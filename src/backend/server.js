import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Accommodate from './Accommodate.js';
import 'dotenv/config';

const URI = process.env.URI;
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(URI)
  .then(async () => {
    console.log('✅ MongoDB 연결 성공!');

  })
  .catch(err => console.error('❌ DB 연결 에러:', err));

app.post('/api/search', async (req, res) => {
    try {
        const { destination } = req.body;
        
        console.log(`검색 요청: ${destination}`);

        const results = await Accommodate.find({
            destination: new RegExp(destination, 'i') 
        });

        res.json({ 
            status: 'success', 
            count: results.length,
            data: results 
        });
    } catch (error) {
        console.error("검색 중 에러 발생:", error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});