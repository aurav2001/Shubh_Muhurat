const Testimonial = require('../models/Testimonial');

const getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
        res.json(testimonials);
    } catch (error) {
        console.error('Testimonials Get Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const createTestimonial = async (req, res) => {
    try {
        const newTestimonial = await Testimonial.create(req.body);
        res.json(newTestimonial);
    } catch (error) {
        console.error('Testimonial Create Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateTestimonial = async (req, res) => {
    try {
        const [updated] = await Testimonial.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedTestimonial = await Testimonial.findByPk(req.params.id);
            res.json(updatedTestimonial);
        } else {
            res.status(404).json({ error: 'Testimonial not found' });
        }
    } catch (error) {
        console.error('Testimonial Update Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const deleteTestimonial = async (req, res) => {
    try {
        const deleted = await Testimonial.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Testimonial deleted' });
        } else {
            res.status(404).json({ error: 'Testimonial not found' });
        }
    } catch (error) {
        console.error('Testimonial Delete Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
