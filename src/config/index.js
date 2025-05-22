import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

export const config = {
  port: process.env.PORT || 3001,
  mexc: {
    apiKey: process.env.MEXC_API_KEY,
    apiSecret: process.env.MEXC_API_SECRET,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
};
