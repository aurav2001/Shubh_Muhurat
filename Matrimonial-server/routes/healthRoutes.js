const express = require('express');
const router = express.Router();
const { healthCheck, statusCheck, testCors } = require('../controllers/healthController');

router.get('/', healthCheck);
router.get('/health', healthCheck);
router.get('/status', statusCheck);
router.get('/test-cors', testCors);

module.exports = router;
