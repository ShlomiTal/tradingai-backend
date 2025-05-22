export class ApiError extends Error {
    constructor(message, statusCode = 500) {
      super(message);
      this.statusCode = statusCode;
    }
  }
  
  export const globalErrorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  };
  