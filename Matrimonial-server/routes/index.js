const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const contentRoutes = require('./contentRoutes');
const storyRoutes = require('./storyRoutes');
const testimonialRoutes = require('./testimonialRoutes');
const communityRoutes = require('./communityRoutes');
const userRoutes = require('./userRoutes');
const planRoutes = require('./planRoutes');
const blogRoutes = require('./blogRoutes');
const inquiryRoutes = require('./inquiryRoutes');
const healthRoutes = require('./healthRoutes');

// Health & diagnostics
router.use('/', healthRoutes);

// Auth & Admin
router.use('/admin', authRoutes);

// Dynamic CMS content
router.use('/content', contentRoutes);

// Core Platform entities
router.use('/stories', storyRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/communities', communityRoutes);
router.use('/users', userRoutes);
router.use('/plans', planRoutes);
router.use('/blogs', blogRoutes);

// Inquiries, Contact, Registrations & SMTP
router.use('/', inquiryRoutes);

module.exports = router;
