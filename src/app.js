import express from 'express';
import cors from 'cors';
import mexcRoutes from './api/mexc/mexc.routes.js';
import { globalErrorHandler } from './middleware/error.middleware.js';
import { config } from './config/index.js';

const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // For development. Be more specific in production.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));

app.use(express.json()); // For parsing application/json

// Simple request logger for development
if (config.nodeEnv === 'development') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });
}

// API Routes
app.use('/api/mexc', mexcRoutes);

// Basic health check
app.get('/health', (req, res) => res.status(200).json({ status: 'OK', message: 'TradingAI Backend is healthy' }));

// Global Error Handling Middleware
app.use(globalErrorHandler);

// Handle 404 for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;