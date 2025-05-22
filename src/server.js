import app from './app.js';
import { config } from './config/index.js';

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`TradingAI Backend listening on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});