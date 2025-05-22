import { fetchAccountSummary } from './mexc.service.js';

export const getAccountSummary = async (req, res, next) => {
  try {
    const summary = await fetchAccountSummary();
    res.json({ success: true, data: summary });
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
