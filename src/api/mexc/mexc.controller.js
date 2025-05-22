// src/api/mexc/mexc.controller.js
import { getAccountInfo } from './mexc.service.js';

export const accountSummary = async (req, res, next) => {
  try {
    const data = await getAccountInfo();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};
