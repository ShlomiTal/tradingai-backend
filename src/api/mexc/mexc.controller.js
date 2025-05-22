import * as mexcService from './mexc.service.js';
import { ApiError } from '../../middleware/errorHandler.js';

export const getAccountSummary = async (req, res, next) => {
  try {
    const summary = await mexcService.getAccountSummary();
    res.json(summary);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

export const getPortfolioHistory = async (req, res, next) => {
  try {
    const { timeframe = '30d' } = req.query;
    const history = await mexcService.getPortfolioHistory(timeframe);
    res.json(history);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

export const getActiveTrades = async (req, res, next) => {
  try {
    const trades = await mexcService.getActiveTrades();
    res.json(trades);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

export const getTradeStats = async (req, res, next) => {
  try {
    const stats = await mexcService.getTradeStats();
    res.json(stats);
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};