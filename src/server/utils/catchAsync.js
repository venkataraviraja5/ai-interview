const catchAsync = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      console.error("API Error:", error);

      const statusCode = error.statusCode || 500;

      res.status(statusCode).json({
        success: false,
        message: error.message || 'Something went wrong',
      });
    }
  };
};

export default catchAsync;
