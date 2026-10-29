const app = require('./app');

if (require.main === module) {
    if (typeof app.startServer === 'function') {
        app.startServer();
    }
}

module.exports = app;
