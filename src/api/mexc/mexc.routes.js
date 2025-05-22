import express from 'express';
import * as mexcController from './mexc.controller.js';

const router = express.Router();

// Account & Portfolio endpoints
router.get('/account-summary', mexcController.getAccountSummary);
router.get('/portfolio-history', mexcController.getPortfolioHistory);
router.get('/active-trades', mexcController.getActiveTrades);
router.get('/trade-stats', mexcController.getTradeStats);

export default router;