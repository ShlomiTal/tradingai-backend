// src/api/mexc/mexc.controller.js
import * as mexcService from './mexc.service.js';

export const getAccountSummary = async (req, res, next) => {
  try {
    const summary = await mexcService.getAccountSummaryFromMEXC();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMarkets = async (req, res, next) => {
  try {
    const markets = await mexcService.getMarketsFromMEXC();
    res.json(markets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};