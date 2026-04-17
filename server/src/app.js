import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/index.js';
import { env } from './config/env.js';

const app = express();

app.use(cors({
  origin: env.clientOrigin,
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    service: 'gwanak-bnb-api',
    docs: '/api/health',
  });
});

app.use('/api', router);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

export default app;
