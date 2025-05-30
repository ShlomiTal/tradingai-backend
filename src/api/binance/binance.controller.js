import * as binanceService from './binance.service.js';
import { ApiError } from '../../middleware/errorHandler.js';


export const getAccountSummary = async (req, res, next) => {
  try {
    const summary = await binanceService.getAccountSummary();
    res.json(summary);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

export const getPortfolioHistory = async (req, res, next) => {
  try {
    const { timeframe = '30d' } = req.query;
    const history = await binanceService.getPortfolioHistory(timeframe);
    res.json(history);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

export const getActiveTrades = async (req, res, next) => {
  try {
    const trades = await binanceService.getActiveTrades();
    res.json(trades);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

export const getTradeStats = async (req, res, next) => {
  try {
    const stats = await binanceService.getTradeStats();
    res.json(stats);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

