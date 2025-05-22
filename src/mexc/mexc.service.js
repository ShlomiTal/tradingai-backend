import axios from 'axios';
import crypto from 'crypto';
import { config } from '../../config/index.js';

const { apiKey, apiSecret } = config.mexc;

export const fetchAccountInfo = async () => {
  const timestamp = Date.now();
  const recvWindow = 5000;
  const queryString = `timestamp=${timestamp}&recvWindow=${recvWindow}`;

  const signature = crypto
    .createHmac('sha256', apiSecret)
    .update(queryString)
    .digest('hex');

  const response = await axios.get(
    `https://api.mexc.com/api/v3/account?${queryString}&signature=${signature}`,
    {
      headers: {
        'X-MEXC-APIKEY': apiKey,
      },
    }
  );

  return response.data;
};
