// src/api/mexc/mexc.routes.js
import express from 'express';
import { getAccountSummary, getMarkets } from './mexc.controller.js';

const router = express.Router();

router.get('/account-summary', getAccountSummary);
router.get('/markets', getMarkets);

export default router;