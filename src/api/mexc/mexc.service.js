import MEXC from 'mexc-api-sdk';
import { config } from '../../config/index.js';

// Initialize MEXC SDK with your API credentials
const mexcClient = new MexcSDK({
  apiKey: config.mexc.apiKey,
  apiSecret: config.mexc.apiSecret,
  // Add any other required configuration
});

export const getAccountSummary = async () => {
  try {
    // Get account information
    const accountInfo = await mexcClient.spot().getAccountInformation();
    const openOrders = await mexcClient.spot().getOpenOrders();
    
    // Calculate total balance in USDT
    const usdtBalance = accountInfo.balances
      .find(b => b.asset === 'USDT')?.free || 0;

    return {
      balance: parseFloat(usdtBalance),
      successRate: "65.2%", // You'll need to calculate this from trade history
      profitLoss: "+$2,387.84", // Calculate from trade history
      profitPercent: "+12.4%", // Calculate from trade history
      activeTrades: openOrders.length,
      tradesInProfit: Math.floor(openOrders.length * 0.65) // Example calculation
    };
  } catch (error) {
    throw new Error(`Failed to fetch account summary: ${error.message}`);
  }
};

export const getPortfolioHistory = async (timeframe) => {
  try {
    // Convert timeframe to milliseconds for the start time
    const now = Date.now();
    const timeframes = {
      '7d': 7 * 24 * 60 * 60 * 1000,
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      '1y': 365 * 24 * 60 * 60 * 1000
    };
    
    const startTime = now - (timeframes[timeframe] || timeframes['30d']);
    
    // Get account snapshots or trade history
    const trades = await mexcClient.spot().getMyTrades({
      startTime,
      endTime: now
    });

    // Process trades to create portfolio history
    // This is a simplified example - you'll need to adapt based on MEXC's actual data structure
    const history = trades.reduce((acc, trade) => {
      const date = new Date(trade.time).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = {
          date,
          balance: 0,
          profit: 0,
          profitPercent: 0
        };
      }
      // Add trade impact to daily balance
      // You'll need to implement your own logic here
      return acc;
    }, {});

    return Object.values(history);
  } catch (error) {
    throw new Error(`Failed to fetch portfolio history: ${error.message}`);
  }
};

export const getActiveTrades = async () => {
  try {
    const openOrders = await mexcClient.spot().getOpenOrders();
    
    return openOrders.map(order => ({
      id: order.orderId,
      symbol: order.symbol,
      type: order.side.toLowerCase(),
      entry_price: parseFloat(order.price),
      current_price: parseFloat(order.price), // You might need to fetch current price separately
      profit_loss: 0, // Calculate based on entry and current price
      position_size: parseFloat(order.origQty),
      strategy: "Manual" // You might want to store this information elsewhere
    }));
  } catch (error) {
    throw new Error(`Failed to fetch active trades: ${error.message}`);
  }
};

export const getTradeStats = async () => {
  try {
    // Fetch recent trades to calculate statistics
    const trades = await mexcClient.spot().getMyTrades();
    
    // Calculate statistics from trades
    const totalTrades = trades.length;
    const winningTrades = trades.filter(t => parseFloat(t.realPnl) > 0);
    const winRate = (winningTrades.length / totalTrades) * 100;

    // Process trades by day
    const tradesByDay = {}; // You'll need to implement this
    
    return {
      totalTrades,
      winRate: winRate.toFixed(1),
      avgProfit: 2.8, // Calculate from trades
      avgLoss: -1.9, // Calculate from trades
      profitFactor: 2.4, // Calculate from trades
      maxDrawdown: 14.3, // Calculate from trades
      tradesByDay: [
        { day: 'Mon', wins: 12, losses: 5 },
        // ... populate with real data
      ],
      tradesByType: [
        { name: 'Long', value: winningTrades.length, color: '#4ade80' },
        { name: 'Short', value: totalTrades - winningTrades.length, color: '#f87171' }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to fetch trade statistics: ${error.message}`);
  }
};