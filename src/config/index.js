import dotenv from 'dotenv';

// Determine if running in production (Railway sets NODE_ENV to 'production')
const isProduction = process.env.NODE_ENV === 'production';

// Only load .env file if not in production (local development)
if (!isProduction) {
  dotenv.config();
}

export const config = {
  port: process.env.PORT || 3001, // Railway will set PORT automatically
  mexc: {
    apiKey: process.env.MEXC_API_KEY,
    apiSecret: process.env.MEXC_API_SECRET,
  },
  nodeEnv: process.env.NODE_ENV || 'development'
};
