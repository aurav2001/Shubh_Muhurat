const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Resource not found at ${req.originalUrl}`
    });
};

const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Application Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    });
};

module.exports = {
    notFoundHandler,
    errorHandler
};
