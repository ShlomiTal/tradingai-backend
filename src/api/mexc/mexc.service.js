// src/api/mexc/mexc.service.js
import axios from 'axios';
import crypto from 'crypto';
import { config } from '../../config/index.js';

const BASE_URL = 'https://api.mexc.com'; // or 'https://www.mexc.com/open/api' if v1

export async function getAccountInfo() {
  const timestamp = Date.now();
  const method = 'GET';
  const path = '/api/v3/account'; // or your actual MEXC endpoint

  // Assemble query string
  const queryString = `timestamp=${timestamp}`;
  const signature = crypto
    .createHmac('sha256', config.mexc.apiSecret)
    .update(queryString)
    .digest('hex');

  const url = `${BASE_URL}${path}?${queryString}&signature=${signature}`;

  const headers = {
    'X-MEXC-APIKEY': config.mexc.apiKey,
  };

  try {
    const res = await axios.get(url, { headers });
    return res.data;
  } catch (error) {
    console.error('MEXC API Error:', error.response?.data || error.message);
    throw error;
  }
}
