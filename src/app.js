import express from 'express';
import cors from 'cors';
import mexcRoutes from './api/binance/binance.routes.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
import { config } from './config/index.js';

const app = express();

// === CORS configuration ===
const corsOptions = {
  origin: '*', // For development — restrict in production!
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies

// === Simple Logger (Dev Mode Only) ===
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// === API Routes ===
app.use('/api/mexc', mexcRoutes);

// === Health Check ===
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'TradingAI Backend is healthy' });
});

// === 404 Handler for Unknown Routes ===
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// === Global Error Handler ===
app.use(globalErrorHandler);

export default app;
