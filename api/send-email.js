import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    const gmailUser = (process.env.GMAIL_USER && process.env.GMAIL_USER.trim()) || 'kshatriyabhinavchauhan@gmail.com';
    const gmailPass = (process.env.GMAIL_APP_PASS || 'xwsrrwqpqfzknxha').replace(/\s+/g, '');
    const ownerEmail = (process.env.GMAIL_RECEIVER && process.env.GMAIL_RECEIVER.trim()) || 'abhinavsirt@gmail.com';
    const visitorEmail = email; // Email entered by user in the form

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    // 1. Notification Email to Portfolio Owner (Abhinav)
    const ownerMailPromise = transporter.sendMail({
      from: `"Portfolio Contact Form" <${gmailUser}>`,
      to: ownerEmail,
      replyTo: visitorEmail,
      subject: `New Portfolio Message: ${subject || 'Inquiry'} from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 24px; background: #0a0a0a; color: #e2e8f0; border-radius: 12px;">
          <h2 style="color: #00f0ff; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">New Contact Message Received</h2>
          <p><strong>Visitor Name:</strong> ${name}</p>
          <p><strong>Visitor Email:</strong> <a href="mailto:${visitorEmail}" style="color: #00f0ff;">${visitorEmail}</a></p>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; margin-top: 16px; border-left: 3px solid #00f0ff;">
            <p style="margin: 0; white-space: pre-wrap; color: #cbd5e1;">${message}</p>
          </div>
        </div>
      `
    });

    // 2. Automated Professional Thank You Email to Visitor (entered in form)
    const thankYouMailPromise = transporter.sendMail({
      from: `"Abhinav Chauhan" <${gmailUser}>`,
      to: visitorEmail,
      subject: `Thank you for reaching out, ${name}! - Abhinav Chauhan`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; color: #e2e8f0; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #141417; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
            .header { background: linear-gradient(135deg, #0a0a0a 0%, #1e1e24 100%); padding: 32px 24px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
            .logo { font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -1px; text-decoration: none; }
            .accent { color: #00f0ff; }
            .content { padding: 32px 28px; line-height: 1.6; }
            .title { font-size: 22px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 16px; }
            .text { color: #94a3b8; font-size: 15px; margin-bottom: 24px; }
            .summary-box { background: rgba(0, 240, 255, 0.04); border-left: 3px solid #00f0ff; padding: 18px 20px; border-radius: 8px; margin-bottom: 28px; }
            .summary-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #00f0ff; font-weight: 600; margin-bottom: 6px; }
            .summary-text { font-size: 14px; color: #cbd5e1; margin: 0; white-space: pre-wrap; }
            .footer { background: #0c0c0e; padding: 24px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; color: #64748b; }
            .social-links a { color: #00f0ff; text-decoration: none; margin: 0 10px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">AC<span class="accent">.</span></div>
            </div>
            <div class="content">
              <h1 class="title">Thank you for getting in touch, ${name}! 👋</h1>
              <p class="text">
                I have successfully received your message regarding <strong>"${subject || 'General Inquiry'}"</strong>.
              </p>
              <p class="text">
                I appreciate you taking the time to reach out! I review incoming inquiries regularly and will get back to you as soon as possible.
              </p>
              <div class="summary-box">
                <div class="summary-label">Copy of your message:</div>
                <p class="summary-text">${message}</p>
              </div>
              <p class="text" style="margin-bottom: 0;">
                Best regards,<br>
                <strong style="color: #ffffff;">Abhinav Chauhan</strong><br>
                <span style="font-size: 13px; color: #64748b;">Software Developer & Cybersecurity Enthusiast</span>
              </p>
            </div>
            <div class="footer">
              <div class="social-links" style="margin-bottom: 12px;">
                <a href="https://github.com/abhinaavchauhan" target="_blank">GitHub</a> •
                <a href="https://linkedin.com/in/abhinaavchauhan" target="_blank">LinkedIn</a>
              </div>
              <div>Designed & Built by Abhinav Chauhan © ${new Date().getFullYear()}</div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    await Promise.all([ownerMailPromise, thankYouMailPromise]);

    return res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (err) {
    console.error('Email API Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
