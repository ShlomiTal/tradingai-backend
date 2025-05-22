import app from './app.js';
import { config } from './config/index.js';


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`TradingAI Backend listening on port ${port}`);
});
