import axios from 'axios';
import crypto from 'crypto';
import { config } from '../../config/index.js';

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
    const usdt = accountInfo.assets.find(a => a.asset === 'USDT');

    return {
      balance: parseFloat(usdt?.availableBalance || 0),
      marginBalance: parseFloat(usdt?.marginBalance || 0),
      unrealizedPnl: parseFloat(usdt?.unrealizedProfit || 0),
      totalWalletBalance: parseFloat(usdt?.walletBalance || 0),
      positions: accountInfo.positions.filter(p => parseFloat(p.positionAmt) !== 0),
    };
  } catch (error) {
    throw new Error(`Failed to fetch Binance Futures account summary: ${error.response?.data?.msg || error.message}`);
  }
};

/**
 * Gets a basic portfolio history mock (Binance doesn't provide direct portfolio history)
 * You'll need to compute this from trades or balance snapshots
 */
export const getPortfolioHistory = async () => {
  try {
    // You can fetch income history, aggregate trades, or funding history
    const income = await binanceSignedGet('/fapi/v1/income', { limit: 30 });

    return income.map(entry => ({
      asset: entry.asset,
      income: entry.income,
      time: new Date(entry.time).toISOString(),
      type: entry.incomeType,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch portfolio history: ${error.response?.data?.msg || error.message}`);
  }
};

/**
 * Gets a summary of recent trade stats
 */
export const getTradeStats = async () => {
  try {
    const trades = await binanceSignedGet('/fapi/v1/userTrades', { limit: 50 });

    const totalProfit = trades.reduce((acc, trade) => acc + parseFloat(trade.realizedPnl), 0);
    const winRate = (trades.filter(t => parseFloat(t.realizedPnl) > 0).length / trades.length) * 100;

    return {
      totalProfit: totalProfit.toFixed(2),
      winRate: `${winRate.toFixed(1)}%`,
      totalTrades: trades.length,
    };
  } catch (error) {
    throw new Error(`Failed to fetch trade stats: ${error.response?.data?.msg || error.message}`);
  }
};

/**
 * Gets currently open futures positions
 */
export const getActiveTrades = async () => {
  try {
    const positions = await binanceSignedGet('/fapi/v2/positionRisk');
    return positions.filter(pos => parseFloat(pos.positionAmt) !== 0);
  } catch (error) {
    throw new Error(`Failed to fetch active trades: ${error.response?.data?.msg || error.message}`);
  }
};
