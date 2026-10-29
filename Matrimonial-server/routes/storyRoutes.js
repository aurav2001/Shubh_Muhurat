const express = require('express');
const router = express.Router();
const {
    getStories,
    createStory,
    updateStory,
    deleteStory
} = require('../controllers/storyController');

router.get('/', getStories);
router.post('/', createStory);
router.put('/:id', updateStory);
router.delete('/:id', deleteStory);

module.exports = router;
