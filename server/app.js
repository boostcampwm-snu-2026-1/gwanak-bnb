import express from 'express';
import cors from 'cors';
import searchRoutes from './routes/searchRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/search', searchRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`관악BNB 서버 실행 중: http://localhost:${PORT}`);
});
