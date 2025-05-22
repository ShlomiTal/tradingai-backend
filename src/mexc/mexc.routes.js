import express from 'express';
import { getAccountInfo } from './mexc.controller.js';

const router = express.Router();

router.get('/account', getAccountInfo);

export default router;
