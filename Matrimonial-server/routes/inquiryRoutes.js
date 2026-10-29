const express = require('express');
const router = express.Router();
const {
    sendContact,
    sendHeroInquiry,
    sendRegistration,
    checkEmailDebug
} = require('../controllers/inquiryController');

router.post('/contact', sendContact);
router.post('/hero-inquiry', sendHeroInquiry);
router.post('/registration', sendRegistration);
router.get('/debug-email', checkEmailDebug);

module.exports = router;
