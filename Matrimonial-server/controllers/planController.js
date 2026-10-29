const Plan = require('../models/Plan');

const getPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll({ order: [['createdAt', 'DESC']] });
        res.json(plans);
    } catch (error) {
        console.error('Plans Get Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const createPlan = async (req, res) => {
    try {
        const newPlan = await Plan.create(req.body);
        res.json(newPlan);
    } catch (error) {
        console.error('Plan Create Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const updatePlan = async (req, res) => {
    try {
        const [updated] = await Plan.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedPlan = await Plan.findByPk(req.params.id);
            res.json(updatedPlan);
        } else {
            res.status(404).json({ error: 'Plan not found' });
        }
    } catch (error) {
        console.error('Plan Update Error:', error);
        res.status(500).json({ message: error.message });
    }
};

const deletePlan = async (req, res) => {
    try {
        const deleted = await Plan.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Plan deleted' });
        } else {
            res.status(404).json({ error: 'Plan not found' });
        }
    } catch (error) {
        console.error('Plan Delete Error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPlans,
    createPlan,
    updatePlan,
    deletePlan
};
