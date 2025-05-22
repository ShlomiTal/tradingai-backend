import { Router } from 'express';
import { getAccountInfo } from './mexc.controller.js';

const router = Router();

router.get('/account', getAccountInfo);

export default router;
