const { isDbConnected } = require('../middlewares/dbMiddleware');
const { getAllowedOrigins } = require('../middlewares/corsMiddleware');

const healthCheck = (req, res) => {
    res.json({
        status: 'online',
        message: 'Shubh Muhurat Matrimonial API is running',
        environment: process.env.NODE_ENV || 'production',
        db_connected: isDbConnected(),
        timestamp: new Date().toISOString()
    });
};

const statusCheck = (req, res) => {
    res.json({
        success: true,
        database: isDbConnected() ? 'Connected' : 'Disconnected',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
        timestamp: new Date().toISOString()
    });
};

const testCors = (req, res) => {
    res.json({
        receivedOrigin: req.headers.origin,
        allowedOrigins: getAllowedOrigins(),
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
};

module.exports = {
    healthCheck,
    statusCheck,
    testCors
};
