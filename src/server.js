import app from './app.js';

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`TradingAI Backend listening on port ${port}`);
});

// Handle unexpected errors and rejections to avoid crashing silently
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
