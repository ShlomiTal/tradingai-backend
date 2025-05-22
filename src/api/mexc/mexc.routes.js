import express from 'express';
import { getAccountSummary } from './mexc.controller.js';

const router = express.Router();

// Define MEXC-related endpoints here
router.get('/account-summary', getAccountSummary);

export default router;
