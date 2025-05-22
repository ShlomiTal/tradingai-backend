export const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    mexc: {
      apiKey: process.env.MEXC_API_KEY,
      apiSecret: process.env.MEXC_API_SECRET,
    },
  };
  