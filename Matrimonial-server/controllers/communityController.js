const Community = require('../models/Community');

const getCommunities = async (req, res) => {
    try {
        const communities = await Community.findAll({ order: [['createdAt', 'DESC']] });
        res.json(communities);
    } catch (error) {
        console.error('Communities Get Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const createCommunity = async (req, res) => {
    try {
        const newCommunity = await Community.create({
            ...req.body,
            created: new Date().toISOString().split('T')[0]
        });
        res.json(newCommunity);
    } catch (error) {
        console.error('Community Create Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateCommunity = async (req, res) => {
    try {
        const [updated] = await Community.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCommunity = await Community.findByPk(req.params.id);
            res.json(updatedCommunity);
        } else {
            res.status(404).json({ error: 'Community not found' });
        }
    } catch (error) {
        console.error('Community Update Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteCommunity = async (req, res) => {
    try {
        const deleted = await Community.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Community deleted' });
        } else {
            res.status(404).json({ error: 'Community not found' });
        }
    } catch (error) {
        console.error('Community Delete Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCommunities,
    createCommunity,
    updateCommunity,
    deleteCommunity
};
