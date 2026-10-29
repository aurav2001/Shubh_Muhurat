const cors = require('cors');

const getAllowedOrigins = () => {
    return (process.env.CORS_ORIGIN || '').split(',').map(o => o.trim()).filter(Boolean);
};

const isOriginAllowed = (origin) => {
    if (!origin) return true; // Mobile apps, Postman, curl
    const allowedOrigins = getAllowedOrigins();
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return true;

    // Any subdomain or domain of shubhmuhurat.biz (http or https)
    if (/^https?:\/\/([a-zA-Z0-9-]+\.)*shubhmuhurat\.biz(:\d+)?$/i.test(origin)) return true;

    // Localhost or 127.0.0.1 on any port
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return true;

    // Private local network IPs (Mac on LAN, 192.168.x.x, 10.x.x.x, 172.16-31.x.x)
    if (/^https?:\/\/(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/i.test(origin)) return true;

    return false;
};

const corsMiddleware = cors({
    origin: function (origin, callback) {
        if (isOriginAllowed(origin)) {
            callback(null, true);
        } else {
            console.warn(`[CORS Blocked] Origin: ${origin} not in allowed list`);
            callback(null, false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
    credentials: true,
    optionsSuccessStatus: 200
});

module.exports = {
    corsMiddleware,
    isOriginAllowed,
    getAllowedOrigins
};
