import express from 'express';
import { getAccountSummary } from './binance.service.js';

const router = express.Router();

router.get('/account-summary', async (req, res) => {
  try {
    const summary = await getAccountSummary();
    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
