const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: (process.env.SMTP_PORT === '465' || !process.env.SMTP_PORT),
    auth: {
        user: (process.env.EMAIL_USER || '').trim(),
        pass: (process.env.EMAIL_PASS || '').trim()
    },
    tls: {
        rejectUnauthorized: false
    }
});

const verifyEmailTransporter = async () => {
    try {
        await transporter.verify();
        console.log('✅ Email Transporter is ready to send messages.');
        return true;
    } catch (error) {
        console.warn('⚠️ Email Transporter warning (check SMTP credentials/firewall):', error.message);
        return false;
    }
};

const sendContactEmail = async ({ name, email, subject, message }) => {
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
    return transporter.sendMail(mailOptions);
};

const sendHeroInquiryEmail = async ({ name, allianceFor, motherTongue, mobile }) => {
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
    return transporter.sendMail(mailOptions);
};

const sendRegistrationEmail = async ({ name, dob, gender, maritalStatus, phone, email }) => {
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
    return transporter.sendMail(mailOptions);
};

module.exports = {
    transporter,
    verifyEmailTransporter,
    sendContactEmail,
    sendHeroInquiryEmail,
    sendRegistrationEmail
};
