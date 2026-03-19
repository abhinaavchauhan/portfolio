import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Try to load .env from frontend since the user mentioned they put it there
dotenv.config({ path: path.resolve('frontend', '.env') });
// fallback to root
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.VITE_EMAIL_USER,
        pass: process.env.VITE_EMAIL_PASS
    }
});

app.post('/api/contact', async (req, res) => {
    try {
        const { user_name, user_email, subject, message } = req.body;

        if (!user_name || !user_email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const mailOptionsOwner = {
            from: `"${user_email}" <${process.env.VITE_EMAIL_USER}>`,
            to: `"Abhinav Chauhan" <${process.env.VITE_EMAIL_USER}>`,
            subject: subject ? `New Portfolio Lead: ${subject}` : `New Lead from ${user_name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Portfolio Message</title>
                </head>
                <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f7f6;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7f6; padding: 40px 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left;">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td style="background-color: #0f172a; padding: 30px; text-align: center;">
                                            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.5px;">NEW PORTFOLIO INQUIRY</h1>
                                            <p style="color: #94a3b8; margin: 5px 0 0 0; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Lead Notification</p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 40px 20px 40px;">
                                            <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 20px;">You Have a New Message!</h2>
                                            
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;">
                                                <tr>
                                                    <td style="padding-bottom: 10px; border-bottom: 1px solid #e2e8f0;">
                                                        <strong style="color: #64748b; font-size: 13px; text-transform: uppercase;">Name:</strong><br>
                                                        <span style="color: #0f172a; font-size: 16px;">${user_name}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                                        <strong style="color: #64748b; font-size: 13px; text-transform: uppercase;">Email:</strong><br>
                                                        <a href="mailto:${user_email}" style="color: #2563eb; font-size: 16px; text-decoration: none;">${user_email}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                                                        <strong style="color: #64748b; font-size: 13px; text-transform: uppercase;">Subject:</strong><br>
                                                        <span style="color: #0f172a; font-size: 16px;">${subject || 'No Subject Provided'}</span>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <!-- Message Box -->
                                            <strong style="color: #64748b; font-size: 13px; text-transform: uppercase; display: block; margin-bottom: 10px;">Message Contents:</strong>
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-left: 4px solid #10b981; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
                                                <tr>
                                                    <td style="padding: 20px;">
                                                        <p style="color: #334155; margin: 0; font-size: 15px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        const mailOptionsUser = {
            from: `"Abhinav Chauhan" <${process.env.VITE_EMAIL_USER}>`,
            to: user_email,
            subject: "We received your message! — Abhinav Chauhan",
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Thank You for Reaching Out</title>
                </head>
                <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0; background-color: #f4f7f6;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f7f6; padding: 40px 20px;">
                        <tr>
                            <td align="center">
                                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: left;">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td style="background-color: #2563eb; padding: 30px; text-align: center;">
                                            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 600; letter-spacing: 0.5px;">ABHINAV CHAUHAN</h1>
                                            <p style="color: #93c5fd; margin: 5px 0 0 0; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Software Developer</p>
                                        </td>
                                    </tr>
                                    
                                    <!-- Content -->
                                    <tr>
                                        <td style="padding: 40px 40px 20px 40px;">
                                            <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 20px;">Thank You for Reaching Out!</h2>
                                            <p style="color: #475569; font-size: 16px; margin-bottom: 24px; line-height: 1.6;">Hi <strong style="color: #0f172a;">${user_name}</strong>,</p>
                                            <p style="color: #475569; font-size: 16px; margin-bottom: 24px; line-height: 1.6;">I have successfully received your inquiry and appreciate you taking the time to contact me. I am currently reviewing your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
                                            
                                            <!-- Message Summary Box -->
                                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-left: 4px solid #3b82f6; border-radius: 0 8px 8px 0; margin-bottom: 30px;">
                                                <tr>
                                                    <td style="padding: 20px;">
                                                        <h3 style="font-size: 13px; text-transform: uppercase; color: #64748b; margin-top: 0; margin-bottom: 10px; letter-spacing: 0.5px; font-weight: 700;">Your Message Details:</h3>
                                                        <p style="color: #334155; margin: 0; font-style: italic; font-size: 15px; line-height: 1.5;">"${message.replace(/\n/g, '<br>')}"</p>
                                                    </td>
                                                </tr>
                                            </table>
                                            
                                            <p style="color: #475569; font-size: 16px; margin-bottom: 24px; line-height: 1.6;">In the meantime, feel free to review my latest projects and skills on my portfolio.</p>
                                            
                                            <div style="height: 1px; background-color: #e2e8f0; margin: 35px 0 25px 0;"></div>
                                            
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                                                <tr>
                                                    <td>
                                                        <p style="color: #475569; font-size: 16px; margin-bottom: 4px; line-height: 1.6;">Best regards,</p>
                                                        <p style="color: #0f172a; font-size: 18px; font-weight: 600; margin: 0;">Abhinav Chauhan</p>
                                                        <p style="color: #64748b; font-size: 14px; margin: 4px 0 0 0;">Software Developer</p>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    
                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f1f5f9; padding: 25px 40px; text-align: center;">
                                            <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">This is an automated response confirming receipt of your message. Please do not reply directly to this email unless you wish to provide additional context to your original message.</p>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        await transporter.sendMail(mailOptionsOwner);
        let userNotified = true;
        try {
            await transporter.sendMail(mailOptionsUser);
        } catch (e) {
            userNotified = false;
        }

        res.status(200).json({ success: true, userNotified });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
