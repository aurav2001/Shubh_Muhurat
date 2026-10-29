const Content = require('../models/Content');

const getContent = async (req, res) => {
    try {
        const contentDoc = await Content.findOne({ where: { key: 'main_content' } });
        res.json(contentDoc ? contentDoc.data : {});
    } catch (error) {
        console.error('Content Get Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateContent = async (req, res) => {
    try {
        const { data } = req.body;
        const [content, created] = await Content.findOrCreate({
            where: { key: 'main_content' },
            defaults: { data: data }
        });
        if (!created) {
            await content.update({ data: data });
        }
        res.json(content.data);
    } catch (error) {
        console.error('❌ Content Update Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getContent,
    updateContent
};
