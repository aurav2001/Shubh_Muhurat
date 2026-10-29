const express = require('express');
const router = express.Router();
const { getContent, updateContent } = require('../controllers/contentController');

router.get('/', getContent);
router.post('/', updateContent);

module.exports = router;
