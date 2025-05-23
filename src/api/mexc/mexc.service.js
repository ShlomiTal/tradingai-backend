import axios from 'axios';
import crypto from 'crypto';
import { config } from '../../config/index.js';

const BASE_URL = 'https://contract.mexc.com';

/**
 * Helper to sign MEXC API requests
 */
function sign(queryParams) {
  return crypto
    .createHmac('sha256', config.mexc.apiSecret)
    .update(queryParams)
    .digest('hex');
}

/**
 * Helper to make signed requests to MEXC Futures API
 */
async function mexcRequest(endpoint, params = {}) {
  const timestamp = Date.now();
  const fullParams = {
    api_key: config.mexc.apiKey,
    req_time: timestamp,
    ...params,
  };

  const query = new URLSearchParams(fullParams).toString();
  const signature = sign(query);
  const url = `${BASE_URL}${endpoint}?${query}&sign=${signature}`;

  const response = await axios.get(url);
  return response.data;
}

/**
 * Get Futures account summary
 */
export const getAccountSummary = async () => {
  try {
    const account = await mexcRequest('/api/v1/private/account/assets');

    const usdtAccount = account.data.find(a => a.currency === 'USDT');

    return {
      balance: parseFloat(usdtAccount.available_balance),
      margin: parseFloat(usdtAccount.margin_balance),
      pnl: parseFloat(usdtAccount.unrealized_pnl),
      leverage: usdtAccount.leverage,
    };
  } catch (error) {
    throw new Error(`Failed to fetch account summary: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Get all open positions
 */
export const getOpenPositions = async () => {
  try {
    const positions = await mexcRequest('/api/v1/private/position/open_positions');

    return positions.data.map(pos => ({
      symbol: pos.symbol,
      side: pos.hold_side,
      leverage: pos.leverage,
      entryPrice: pos.open_price,
      unrealizedPnL: pos.unrealized_pnl,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch open positions: ${error.response?.data?.message || error.message}`);
  }
};
