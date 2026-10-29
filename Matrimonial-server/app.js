// Phusion Passenger configuration (must be configured before any server setup)
if (typeof(PhusionPassenger) !== 'undefined') {
    PhusionPassenger.configure({ autoInstall: false });
}

const path = require('path');
const fs = require('fs');

// Auto-fallback: if node_modules was renamed to node_modules_old on cPanel
const nodeModulesOld = path.join(__dirname, 'node_modules_old');
if (!fs.existsSync(path.join(__dirname, 'node_modules')) && fs.existsSync(nodeModulesOld)) {
    module.paths.unshift(nodeModulesOld);
    if (require('module').globalPaths) {
        require('module').globalPaths.push(nodeModulesOld);
    }
}

require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/db');
const nodemailer = require('nodemailer');

// Models
const Story = require('./models/Story');
const Testimonial = require('./models/Testimonial');
const Community = require('./models/Community');
const User = require('./models/User');
const Plan = require('./models/Plan');
const Blog = require('./models/Blog');
const Content = require('./models/Content');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Security Middleware ---
// crossOriginResourcePolicy: "cross-origin" is critical so Safari (Mac/iOS) does not block API requests
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Body Parser with high limits
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(require('compression')());

// Enhanced CORS matcher for production and local network cross-device testing (Mac, Windows, Mobile)
const allowedOrigins = (process.env.CORS_ORIGIN || '').split(',').map(o => o.trim()).filter(Boolean);

const isOriginAllowed = (origin) => {
    if (!origin) return true; // Mobile apps, Postman, curl
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return true;
    
    // Any subdomain or domain of shubhmuhurat.biz (http or https)
    if (/^https?:\/\/([a-zA-Z0-9-]+\.)*shubhmuhurat\.biz(:\d+)?$/i.test(origin)) return true;

    // Localhost or 127.0.0.1 on any port
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return true;

    // Private local network IPs (Mac on LAN, 192.168.x.x, 10.x.x.x, 172.16-31.x.x)
    if (/^https?:\/\/(192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[01])\.\d+\.\d+)(:\d+)?$/i.test(origin)) return true;

    return false;
};

app.use(cors({
    origin: function (origin, callback) {
        if (isOriginAllowed(origin)) {
            callback(null, true);
        } else {
            console.warn(`[CORS Blocked] Origin: ${origin} not in allowed list`);
            callback(null, false);
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'],
    credentials: true,
    optionsSuccessStatus: 200
}));
app.options('*', cors());

// Diagnostic route to check what origins the server actually sees
app.get('/api/test-cors', (req, res) => {
    res.json({
        receivedOrigin: req.headers.origin,
        allowedOrigins: (process.env.CORS_ORIGIN || '').split(',').map(o => o.trim()),
        nodeEnv: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Serverless DB connection middleware (lazy connect on cold start)
let dbConnected = false;
app.use(async (req, res, next) => {
    if (!dbConnected) {
        try {
            await connectDB();
            dbConnected = true;
        } catch (err) {
            console.error('DB connection failed:', err.message);
        }
    }
    next();
});

// --- Routes ---

// Reusable middleware to handle /api prefix optionally
const apiPrefix = (req, res, next) => {
    if (req.url.startsWith('/api')) {
        req.url = req.url.replace('/api', '') || '/';
    }
    next();
};

// Apply prefix handling to all routes or just define them twice
// For simplicity and safety on cPanel, we will define them clearly.

// Health check & diagnostic (Base & /api)
const healthCheck = (req, res) => {
    res.json({ 
        status: 'API is running', 
        environment: process.env.NODE_ENV || 'production',
        db_connected: dbConnected,
        timestamp: new Date().toISOString() 
    });
};
app.get('/', healthCheck);
app.get('/api', healthCheck);

// Explicit status check (Base & /api)
const statusCheck = (req, res) => {
    res.json({
        success: true,
        database: dbConnected ? 'Connected' : 'Disconnected',
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage()
    });
};
app.get('/status', statusCheck);
app.get('/api/status', statusCheck);

// Reusable Email Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: (process.env.SMTP_PORT === '465' || !process.env.SMTP_PORT), // Use SSL for 465
    auth: {
        user: (process.env.EMAIL_USER || "").trim(),
        pass: (process.env.EMAIL_PASS || "").trim()
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Diagnostic route for email transparency
app.get('/api/debug-email', async (req, res) => {
    try {
        const user = (process.env.EMAIL_USER || "").trim();
        const pass = (process.env.EMAIL_PASS || "").trim();
        
        console.log("🔍 Checking transporter...");
        await transporter.verify();
        res.json({
            status: 'Success',
            message: 'Email transporter is connected and ready.',
            config: {
                user: user.substring(0, 3) + '...' + user.substring(user.length - 3),
                pass_length: pass.length,
                host: process.env.SMTP_HOST || 'smtp.gmail.com',
                port: process.env.SMTP_PORT || 465
            }
        });
    } catch (error) {
        const rawUser = process.env.EMAIL_USER || "";
        const rawPass = process.env.EMAIL_PASS || "";
        
        console.error("❌ Transporter Check Failed:", error);
        res.status(500).json({
            status: 'Error',
            message: 'Transporter failed connection check.',
            error: error.message,
            code: error.code,
            details: {
                user_has_whitespace: rawUser !== rawUser.trim(),
                pass_has_whitespace: rawPass !== rawPass.trim(),
                pass_length: rawPass.trim().length,
                first_char_code: rawPass.trim().charCodeAt(0),
                last_char_code: rawPass.trim().charCodeAt(rawPass.trim().length - 1)
            },
            hint: "Credentials have been auto-trimmed in code now. If error persists, re-generate Google App Password."
        });
    }
});

// Admin Login
app.post(['/admin/login', '/api/admin/login'], (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USER;
    const adminPass = process.env.ADMIN_PASS;

    if (username === adminUser && password === adminPass) {
        res.json({ success: true, token: 'mock-token-' + Date.now() });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Send Contact Email
app.post(['/contact', '/api/contact'], async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `📩 New Contact Msg: ${subject || 'General Inquiry'}`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #C62828, #E53935); padding: 24px; text-align: center;">
                    <h2 style="color: white; margin: 0; font-size: 22px;">📩 New Contact Message</h2>
                    <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">From Shubh Mhurat Matrimonial Website</p>
                </div>
                <div style="padding: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr><td style="padding: 10px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">Name</td><td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${name}</td></tr>
                        <tr><td style="padding: 10px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">Email</td><td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${email}</td></tr>
                        <tr><td style="padding: 10px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">Subject</td><td style="padding: 10px; color: #6b7280; border-bottom: 1px solid #f3f4f6;">${subject}</td></tr>
                    </table>
                    <div style="margin-top: 16px; background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #E53935;">
                        <p style="margin: 0; font-weight: bold; color: #374151; margin-bottom: 8px;">Message:</p>
                        <p style="margin: 0; color: #6b7280; line-height: 1.6;">${message ? message.replace(/\n/g, '<br>') : 'N/A'}</p>
                    </div>
                </div>
                <div style="background: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
                    Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ success: false, message: 'Failed to send message.', error: error.toString() });
    }
});

// Hero Form Inquiry Email
app.post(['/hero-inquiry', '/api/hero-inquiry'], async (req, res) => {
    const { name, allianceFor, motherTongue, mobile } = req.body;

    const mailOptions = {
        from: `"Shubh Mhurat" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🔔 New Inquiry: ${name} - ${allianceFor || 'N/A'}`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #7B5B1E, #A67C00, #C5963A); padding: 24px; text-align: center;">
                    <h2 style="color: white; margin: 0; font-size: 22px;">🔔 New Quick Inquiry</h2>
                    <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">From Hero Section - Shubh Mhurat</p>
                </div>
                <div style="padding: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6; width: 40%;">👤 Name</td>
                            <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">💍 Alliance For</td>
                            <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${allianceFor || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">🗣️ Mother Tongue</td>
                            <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${motherTongue || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151;">📱 Mobile</td>
                            <td style="padding: 12px; color: #1f2937; font-size: 15px;">+91 ${mobile || 'N/A'}</td>
                        </tr>
                    </table>
                </div>
                <div style="background: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
                    Received on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </div>
            </div>
        `
    };

    try {
        console.log("📨 Attempting to send Hero Inquiry email...");
        await transporter.sendMail(mailOptions);
        console.log("✅ Hero Inquiry email sent successfully.");
        res.status(200).json({ success: true, message: 'Inquiry sent successfully!' });
    } catch (error) {
        console.error("❌ Hero Inquiry Email Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error during email transmission.',
            error: error.message,
            code: error.code,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            hint: "Verify SMTP credentials and firewall settings."
        });
    }
});

// Registration Form Email
app.post('/api/registration', async (req, res) => {
    const { name, dob, gender, maritalStatus, phone, email } = req.body;

    const mailOptions = {
        from: `"Shubh Mhurat" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🎉 New Registration: ${name} (${gender || 'N/A'})`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #C62828, #E53935, #FF5252); padding: 24px; text-align: center;">
                    <h2 style="color: white; margin: 0; font-size: 22px;">🎉 New Profile Registration</h2>
                    <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Shubh Mhurat Matrimonial</p>
                </div>
                <div style="padding: 24px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6; width: 40%;">👤 Full Name</td>
                            <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${name || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">📅 Date of Birth</td>
                            <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${dob || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">⚧ Gender</td>
                            <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${gender || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">💍 Marital Status</td>
                            <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${maritalStatus || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151; border-bottom: 1px solid #f3f4f6;">📱 Phone</td>
                            <td style="padding: 12px; color: #1f2937; border-bottom: 1px solid #f3f4f6; font-size: 15px;">${phone || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; font-weight: bold; color: #374151;">📧 Email</td>
                            <td style="padding: 12px; color: #1f2937; font-size: 15px;">${email || 'N/A'}</td>
                        </tr>
                    </table>
                </div>
                <div style="background: #f9fafb; padding: 16px; text-align: center; font-size: 12px; color: #9ca3af;">
                    Registered on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Registration email sent!' });
    } catch (error) {
        console.error("Registration Email Error:", error);
        res.status(500).json({ success: false, message: 'Failed to send registration email.', error: error.toString() });
    }
});

// Health Check Route
app.get(['/', '/api', '/api/health'], (req, res) => {
    res.json({
        status: 'online',
        message: 'Shubh Muhurat Matrimonial API is running',
        timestamp: new Date().toISOString()
    });
});

// Get Content
app.get(['/content', '/api/content'], async (req, res) => {
    try {
        const contentDoc = await Content.findOne({ where: { key: 'main_content' } });
        res.json(contentDoc ? contentDoc.data : {});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Content
app.post(['/content', '/api/content'], async (req, res) => {
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
        console.error("❌ Content Update Error:", error);
        res.status(500).json({ message: error.message });
    }
});

// --- Success Stories Routes ---
app.get(['/stories', '/api/stories'], async (req, res) => {
    try {
        const stories = await Story.findAll({ order: [['createdAt', 'DESC']] });
        res.json(stories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post(['/stories', '/api/stories'], async (req, res) => {
    try {
        const newStory = await Story.create(req.body);
        res.json(newStory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/stories/:id', async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/stories/:id', async (req, res) => {
    try {
        const deleted = await Story.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Story deleted' });
        } else {
            res.status(404).json({ error: 'Story not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Testimonials Routes ---
app.get(['/testimonials', '/api/testimonials'], async (req, res) => {
    try {
        const testimonials = await Testimonial.findAll({ order: [['createdAt', 'DESC']] });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post(['/testimonials', '/api/testimonials'], async (req, res) => {
    try {
        const newTestimonial = await Testimonial.create(req.body);
        res.json(newTestimonial);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/testimonials/:id', async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/testimonials/:id', async (req, res) => {
    try {
        const deleted = await Testimonial.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Testimonial deleted' });
        } else {
            res.status(404).json({ error: 'Testimonial not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Community Routes ---
app.get(['/communities', '/api/communities'], async (req, res) => {
    try {
        const communities = await Community.findAll({ order: [['createdAt', 'DESC']] });
        res.json(communities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/communities', async (req, res) => {
    try {
        const newCommunity = await Community.create({
            ...req.body,
            created: new Date().toISOString().split('T')[0]
        });
        res.json(newCommunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/communities/:id', async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/communities/:id', async (req, res) => {
    try {
        const deleted = await Community.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Community deleted' });
        } else {
            res.status(404).json({ error: 'Community not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- User Routes ---
app.get(['/users', '/api/users'], async (req, res) => {
    try {
        const users = await User.findAll({ order: [['createdAt', 'DESC']] });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const newUser = await User.create({
            ...req.body,
            joined: new Date().toISOString().split('T')[0]
        });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedUser = await User.findByPk(req.params.id);
            res.json(updatedUser);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/users/:id', async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Membership Plans Routes ---
app.get(['/plans', '/api/plans'], async (req, res) => {
    try {
        const plans = await Plan.findAll({ order: [['createdAt', 'DESC']] });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/plans', async (req, res) => {
    try {
        const newPlan = await Plan.create(req.body);
        res.json(newPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/plans/:id', async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/plans/:id', async (req, res) => {
    try {
        const deleted = await Plan.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Plan deleted' });
        } else {
            res.status(404).json({ error: 'Plan not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Blog Routes ---
app.get(['/blogs', '/api/blogs'], async (req, res) => {
    try {
        const blogs = await Blog.findAll({ order: [['createdAt', 'DESC']] });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/blogs', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            ...req.body,
            created: new Date().toISOString().split('T')[0]
        });
        res.json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/api/blogs/:id', async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const deleted = await Blog.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.json({ message: 'Blog post deleted' });
        } else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const startServer = async () => {
    try {
        await connectDB();
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('⚠️ Database connection failed:', error.message);
        console.log('⚠️ Server running without database - some features may not work.');
    }

    // Verify email asynchronously in background so server never hangs on startup
    transporter.verify().then(() => {
        console.log("✅ Email Transporter is ready to send messages.");
    }).catch(error => {
        console.warn("⚠️ Email Transporter warning (check SMTP credentials/firewall):", error.message);
    });
};

startServer();

// Start HTTP server listener (compatible with Phusion Passenger and standalone Node)
if (typeof(PhusionPassenger) !== 'undefined') {
    app.listen('passenger', () => {
        console.log('🚀 Server running with Phusion Passenger');
    });
} else {
    app.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
    });
}

module.exports = app;
