import express from 'express';
import * as binanceController from './binance.controller.js';

const router = express.Router();

// Account & Portfolio endpoints
router.get('/account-summary', binanceController.getAccountSummary);
router.get('/portfolio-history', binanceController.getPortfolioHistory);
router.get('/active-trades', binanceController.getActiveTrades);
router.get('/trade-stats', binanceController.getTradeStats);

export default router;