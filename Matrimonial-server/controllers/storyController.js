const Story = require('../models/Story');

const getStories = async (req, res) => {
    try {
        const stories = await Story.findAll({ order: [['createdAt', 'DESC']] });
        res.json(stories);
    } catch (error) {
        console.error('Stories Get Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const createStory = async (req, res) => {
    try {
        const newStory = await Story.create(req.body);
        res.json(newStory);
    } catch (error) {
        console.error('Story Create Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateStory = async (req, res) => {
    try {
        const [updated] = await Story.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedStory = await Story.findByPk(req.params.id);
            res.json(updatedStory);
        } else {
            res.status(404).json({ error: 'Story not found' });
        }
    } catch (error) {
        console.error('Story Update Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteStory = async (req, res) => {
    try {
        const deleted = await Story.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Story deleted' });
        } else {
            res.status(404).json({ error: 'Story not found' });
        }
    } catch (error) {
        console.error('Story Delete Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getStories,
    createStory,
    updateStory,
    deleteStory
};
