import { fetchAccountInfo } from './mexc.service.js';

export const getAccountInfo = async (req, res, next) => {
  try {
    const data = await fetchAccountInfo();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
