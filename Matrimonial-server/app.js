// Phusion Passenger configuration (must be configured before any server setup)
if (typeof (PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const path = require('path');
const fs = require('fs');

// Auto-fallback: if node_modules was renamed to node_modules_old on cPanel
const nodeModulesOld = path.join(__dirname, 'node_modules_old');
if (!fs.existsSync(path.join(__dirname, 'node_modules')) && fs.existsSync(nodeModulesOld)) {
    module.paths.unshift(nodeModulesOld);
    if (require('module').globalPaths) {
        require('module').globalPaths.push(nodeModulesOld);
    }
}

require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');

// Custom Middlewares
const { corsMiddleware } = require('./middlewares/corsMiddleware');
const { dbMiddleware } = require('./middlewares/dbMiddleware');
const { errorHandler } = require('./middlewares/errorMiddleware');

// Master Routes
const apiRoutes = require('./routes');
const { connectDB } = require('./config/db');
const { verifyEmailTransporter } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 5000;

// Security Headers
app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// Body Parsers & Compression
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(compression());

// CORS & Lazy DB Connection
app.use(corsMiddleware);
app.options('*', corsMiddleware);
app.use(dbMiddleware);

// Mount Modular API Routes
app.use('/api', apiRoutes);
app.use('/', apiRoutes);

// Centralized Error Handling
app.use(errorHandler);

// Server startup helper
const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('⚠️ Database connection failed:', error.message);
        console.log('⚠️ Server running without database - some features may not work.');
    }

    // Verify email asynchronously in background
    verifyEmailTransporter();

    // Start HTTP server listener
    if (typeof (PhusionPassenger) !== 'undefined') {
        app.listen('passenger', () => {
            console.log('🚀 Server running with Phusion Passenger');
        });
    } else {
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on port ${PORT}`);
        });
    }
};

// Auto-start if run directly or via Passenger
if (require.main === module || typeof (PhusionPassenger) !== 'undefined') {
    startServer();
}

module.exports = app;
module.exports.startServer = startServer;
