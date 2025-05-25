import axios from 'axios';
import crypto from 'crypto';
import { config } from '../../config/index.js'; // should contain config.binance.apiKey & apiSecret

const BASE_URL = 'https://fapi.binance.com';

/**
 * Signs query params for Binance Futures API using HMAC SHA256
 */
function sign(queryString) {
  return crypto
    .createHmac('sha256', config.binance.apiSecret)
    .update(queryString)
    .digest('hex');
}

/**
 * Makes a signed GET request to Binance Futures API
 */
async function binanceSignedGet(endpoint, params = {}) {
  const timestamp = Date.now();
  const query = new URLSearchParams({ ...params, timestamp }).toString();
  const signature = sign(query);

  const url = `${BASE_URL}${endpoint}?${query}&signature=${signature}`;

  const response = await axios.get(url, {
    headers: {
      'X-MBX-APIKEY': config.binance.apiKey,
    },
  });

  return response.data;
}

/**
 * Gets Binance Futures account summary
 */
export const getAccountSummary = async () => {
  try {
    const accountInfo = await binanceSignedGet('/fapi/v2/account');

    const usdtAsset = accountInfo.assets.find(asset => asset.asset === 'USDT');

    return {
      balance: parseFloat(usdtAsset.availableBalance),
      marginBalance: parseFloat(usdtAsset.marginBalance),
      unrealizedPnl: parseFloat(usdtAsset.unrealizedProfit),
      totalWalletBalance: parseFloat(usdtAsset.walletBalance),
      positions: accountInfo.positions.filter(p => parseFloat(p.positionAmt) !== 0),
    };
  } catch (error) {
    throw new Error(`Failed to fetch Binance Futures account summary: ${error.response?.data?.msg || error.message}`);
  }
};
