require('mysql2'); // Force Vercel fully include the mysql2 package
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || process.env.DB_NAME,
    process.env.MYSQL_USER || process.env.DB_USER,
    process.env.MYSQL_PASSWORD || process.env.DB_PASS,
    {
        host: process.env.MYSQL_HOST || process.env.DB_HOST || 'localhost',
        port: process.env.MYSQL_PORT || process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 10,
            min: 0,
            acquire: 3000, // Reduced from 30000
            idle: 10000
        },
        dialectOptions: {
            connectTimeout: 3000 // 3 seconds timeout
        },
        define: {
            timestamps: true,
            underscored: false
        }
    }
);

// Test connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ MySQL Connected successfully.');

        // On cPanel, we only want to sync if tables are missing. 
        // alter:true is VERY slow and can cause Connection Timeouts.
        // We'll use default sync() which only creates missing tables.
        await sequelize.sync();
        console.log('✅ Database checked/synchronized.');
    } catch (error) {
        console.error('❌ Unable to connect to MySQL:', error.message);
        throw error;
    }
};

module.exports = { sequelize, connectDB };
