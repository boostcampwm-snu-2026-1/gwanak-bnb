import cors from 'cors';
import express from 'express';
import { apiRouter } from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { env } from './config/env.js';

const app = express();

app.use(
  cors({
    origin: env.frontendOrigin || true,
  })
);
app.use(express.json());

app.get('/', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    message: 'Gwanak BnB API server',
    healthCheck: '/api/health',
  });
});

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    message: 'Gwanak BnB API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiRouter);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
