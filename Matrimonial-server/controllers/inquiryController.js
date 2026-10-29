const {
    transporter,
    sendContactEmail,
    sendHeroInquiryEmail,
    sendRegistrationEmail
} = require('../services/emailService');

const sendContact = async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await sendContactEmail({ name, email, subject, message });
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message.', error: error.toString() });
    }
};

const sendHeroInquiry = async (req, res) => {
    const { name, allianceFor, motherTongue, mobile } = req.body;
    try {
        console.log('📨 Attempting to send Hero Inquiry email...');
        await sendHeroInquiryEmail({ name, allianceFor, motherTongue, mobile });
        console.log('✅ Hero Inquiry email sent successfully.');
        res.status(200).json({ success: true, message: 'Inquiry sent successfully!' });
    } catch (error) {
        console.error('❌ Hero Inquiry Email Error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error during email transmission.',
            error: error.message,
            code: error.code,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            hint: 'Verify SMTP credentials and firewall settings.'
        });
    }
};

const sendRegistration = async (req, res) => {
    const { name, dob, gender, maritalStatus, phone, email } = req.body;
    try {
        await sendRegistrationEmail({ name, dob, gender, maritalStatus, phone, email });
        res.status(200).json({ success: true, message: 'Registration email sent!' });
    } catch (error) {
        console.error('Registration Email Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send registration email.', error: error.toString() });
    }
};

const checkEmailDebug = async (req, res) => {
    try {
        const user = (process.env.EMAIL_USER || '').trim();
        const pass = (process.env.EMAIL_PASS || '').trim();

        console.log('🔍 Checking transporter...');
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
        const rawUser = process.env.EMAIL_USER || '';
        const rawPass = process.env.EMAIL_PASS || '';

        console.error('❌ Transporter Check Failed:', error);
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
            hint: 'Credentials have been auto-trimmed in code now. If error persists, re-generate Google App Password.'
        });
    }
};

module.exports = {
    sendContact,
    sendHeroInquiry,
    sendRegistration,
    checkEmailDebug
};
