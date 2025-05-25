import express from 'express';
import * as binanceService from './binance.service.js';

const router = express.Router();

router.get('/account-summary', async (req, res) => {
  const data = await binanceService.getAccountSummary();
  res.json(data);
});

router.get('/portfolio-history', async (req, res) => {
  const data = await binanceService.getPortfolioHistory();
  res.json(data);
});

router.get('/trade-stats', async (req, res) => {
  const data = await binanceService.getTradeStats();
  res.json(data);
});

router.get('/active-trades', async (req, res) => {
  const data = await binanceService.getActiveTrades();
  res.json(data);
});

export default router;
