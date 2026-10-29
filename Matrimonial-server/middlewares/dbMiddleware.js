const { connectDB } = require('../config/db');

let dbConnected = false;

const isDbConnected = () => dbConnected;

const dbMiddleware = async (req, res, next) => {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
        } catch (err) {
            console.error('DB connection failed in middleware:', err.message);
        }
    }
    next();
};

module.exports = {
    dbMiddleware,
    isDbConnected
};
