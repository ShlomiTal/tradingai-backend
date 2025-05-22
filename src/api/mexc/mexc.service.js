import axios from 'axios';
import crypto from 'crypto';
import { config } from '../../config/index.js';

export const fetchAccountSummary = async () => {
  const { apiKey, apiSecret } = config.mexc;

  const baseUrl = 'https://api.mexc.com';
  const path = '/api/v3/account'; // Example endpoint, update if needed
  const timestamp = Date.now();

  const query = `timestamp=${timestamp}`;
  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(query)
    .digest('hex');

  const url = `${baseUrl}${path}?${query}&signature=${signature}`;

  const response = await axios.get(url, {
    headers: {
      'X-MEXC-APIKEY': apiKey,
    },
  });

  return response.data;
};
