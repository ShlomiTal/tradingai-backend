import { fetchAccountInfo } from './mexc.service.js';

export const getAccountInfo = async (req, res, next) => {
  try {
    const data = await fetchAccountInfo();
    res.json(data);
  } catch (error) {
    next(error);
  }
};
