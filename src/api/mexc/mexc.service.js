import axios from 'axios';
import crypto from 'crypto';
import { config } from '../../config/index.js';
import { ApiError } from '../../middleware/errorHandler.js';

export const fetchAccountInfo = async () => {
  if (!config.mexc.apiKey || !config.mexc.apiSecret) {
    throw new ApiError('MEXC API Key or Secret not configured.', 500);
  }

  const timestamp = Date.now();
  const params = `timestamp=${timestamp}`;
  const signature = crypto
    .createHmac('sha256', config.mexc.apiSecret)
    .update(params)
    .digest('hex');

  try {
    const response = await axios.get(`https://api.mexc.com/api/v3/account?${params}&signature=${signature}`, {
      headers: {
        'X-MEXC-APIKEY': config.mexc.apiKey,
      },
    });
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.msg || error.message;
    throw new ApiError(`MEXC API Error: ${msg}`, error.response?.status || 500);
  }
};
