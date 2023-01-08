const AppError = require('./AppError');

const ErrorHandler = (error, _, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      error: error.message.message,
    });
  }

  response.status(500).json({
    message: 'Internal server error',
  });

  next();
};

module.exports = ErrorHandler;
