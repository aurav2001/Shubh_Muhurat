const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.findAll({ order: [['createdAt', 'DESC']] });
        res.json(blogs);
    } catch (error) {
        console.error('Blogs Get Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            created: new Date().toISOString().split('T')[0]
        });
        res.json(newBlog);
    } catch (error) {
        console.error('Blog Create Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const [updated] = await Blog.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedBlog = await Blog.findByPk(req.params.id);
            res.json(updatedBlog);
        } else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    } catch (error) {
        console.error('Blog Update Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const deleted = await Blog.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Blog post deleted' });
        } else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    } catch (error) {
        console.error('Blog Delete Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog
};
