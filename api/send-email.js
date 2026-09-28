let cachedTransporter = null;
let cachedKey = null;

function getTransporter(user, pass) {
  const key = `${user}:${pass}`;
  if (!cachedTransporter || cachedKey !== key) {
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
      rateDelta: 1000,
      rateLimit: 5,
      auth: { user, pass }
    });
    cachedKey = key;
  }
  return cachedTransporter;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body || {};

    const gmailUser = process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER || 'kshatriyabhinavchauhan@gmail.com';
    const gmailPass = (process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASS || '').replace(/\s+/g, '');
    const ownerEmail = process.env.CONTACT_RECEIVER || process.env.EMAIL_RECEIVER || process.env.GMAIL_RECEIVER || 'abhinavsirt@gmail.com';
    const visitorEmail = email; // Email entered by user in the form

    const transporter = getTransporter(gmailUser, gmailPass);

    const timestamp = new Date().toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Kolkata'
    });

    // 1. Notification Email to Portfolio Owner (Abhinav)
    const ownerMailPromise = transporter.sendMail({
      from: `"Abhinav Chauhan" <${gmailUser}>`,
      to: ownerEmail,
      replyTo: visitorEmail,
      subject: `New Portfolio Inquiry — ${subject || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Portfolio Message</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090a0f; color: #e2e8f0; margin: 0; padding: 30px 15px; -webkit-font-smoothing: antialiased; }
            .wrapper { max-width: 620px; margin: 0 auto; background: #11141d; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6); }
            .header-bar { background: linear-gradient(90deg, #00f0ff 0%, #7928ca 50%, #ff0080 100%); height: 4px; width: 100%; }
            .header { padding: 28px 32px 20px 32px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
            .brand { font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
            .brand-accent { color: #00f0ff; }
            .badge { display: inline-block; padding: 5px 12px; background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); color: #00f0ff; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; }
            .content { padding: 32px; }
            .title { font-size: 22px; font-weight: 700; color: #ffffff; margin: 0 0 24px 0; }
            .grid { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
            .grid td { padding: 10px 0; vertical-align: top; }
            .label { width: 100px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600; }
            .val { font-size: 15px; color: #f1f5f9; font-weight: 500; }
            .val a { color: #00f0ff; text-decoration: none; }
            .msg-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); border-left: 4px solid #00f0ff; padding: 20px; border-radius: 10px; margin: 24px 0; }
            .msg-header { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #00f0ff; font-weight: 700; margin-bottom: 10px; }
            .msg-body { font-size: 15px; color: #cbd5e1; line-height: 1.6; white-space: pre-wrap; margin: 0; }
            .cta-wrap { text-align: center; margin: 32px 0 16px 0; }
            .btn { display: inline-block; padding: 14px 32px; background: #00f0ff; color: #090a0f; font-weight: 700; text-decoration: none; border-radius: 50px; font-size: 14px; letter-spacing: 0.5px; box-shadow: 0 4px 20px rgba(0, 240, 255, 0.3); }
            .footer { background: #0c0d13; padding: 20px 32px; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 12px; color: #475569; text-align: center; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header-bar"></div>
            <div class="header">
              <span class="brand">AC<span class="brand-accent">.</span> Portfolio</span>
              <span class="badge">New Message</span>
            </div>
            <div class="content">
              <h1 class="title">You received a new message</h1>
              <table class="grid">
                <tr>
                  <td class="label">Sender</td>
                  <td class="val"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td class="label">Email</td>
                  <td class="val"><a href="mailto:${visitorEmail}">${visitorEmail}</a></td>
                </tr>
                <tr>
                  <td class="label">Subject</td>
                  <td class="val">${subject || 'N/A'}</td>
                </tr>
                <tr>
                  <td class="label">Date</td>
                  <td class="val" style="color: #94a3b8; font-size: 13px;">${timestamp}</td>
                </tr>
              </table>

              <div class="msg-card">
                <div class="msg-header">Message Content</div>
                <p class="msg-body">${message}</p>
              </div>

              <div class="cta-wrap">
                <a href="mailto:${visitorEmail}?subject=Re: ${encodeURIComponent(subject || 'Inquiry')}" class="btn">Reply to ${name}</a>
              </div>
            </div>
            <div class="footer">
              Automated notification sent from your portfolio website.
            </div>
          </div>
        </body>
        </html>
      `
    });

    // 2. Automated Professional Thank You Email to Visitor
    const thankYouMailPromise = transporter.sendMail({
      from: `"Abhinav Chauhan" <${gmailUser}>`,
      to: visitorEmail,
      replyTo: ownerEmail,
      subject: `Thank You for Contacting Me — Abhinav Chauhan`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Me</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090a0f; color: #e2e8f0; margin: 0; padding: 30px 15px; -webkit-font-smoothing: antialiased; }
            .wrapper { max-width: 620px; margin: 0 auto; background: #11141d; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6); }
            .header-bar { background: linear-gradient(90deg, #00f0ff 0%, #7928ca 50%, #ff0080 100%); height: 4px; width: 100%; }
            .header { padding: 32px 32px 24px 32px; text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
            .logo { font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -1px; text-decoration: none; }
            .logo-accent { color: #00f0ff; }
            .subtitle { font-size: 12px; color: #64748b; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; margin-top: 4px; }
            .content { padding: 36px 32px; line-height: 1.6; }
            .greeting { font-size: 22px; font-weight: 700; color: #ffffff; margin-top: 0; margin-bottom: 16px; }
            .text { color: #94a3b8; font-size: 15px; margin-bottom: 20px; }
            .summary-card { background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); border-left: 4px solid #00f0ff; padding: 20px; border-radius: 10px; margin: 24px 0; }
            .summary-header { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #00f0ff; font-weight: 700; margin-bottom: 8px; }
            .summary-subject { font-size: 14px; font-weight: 600; color: #ffffff; margin-bottom: 8px; }
            .summary-text { font-size: 14px; color: #cbd5e1; margin: 0; white-space: pre-wrap; line-height: 1.5; }
            .signature { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.06); }
            .sig-name { font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 2px; }
            .sig-title { font-size: 13px; color: #00f0ff; font-weight: 500; }
            .footer { background: #0c0d13; padding: 24px 32px; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.05); font-size: 13px; color: #475569; }
            .social-links { margin-bottom: 12px; }
            .social-links a { color: #00f0ff; text-decoration: none; margin: 0 12px; font-weight: 600; font-size: 13px; transition: color 0.2s; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header-bar"></div>
            <div class="header">
              <div class="logo">AC<span class="logo-accent">.</span></div>
              <div class="subtitle">Abhinav Chauhan • Software & Security</div>
            </div>
            <div class="content">
              <h1 class="greeting">Hello ${name},</h1>
              <p class="text">
                Thank you for reaching out through my portfolio website. I have successfully received your inquiry and appreciate you taking the time to write.
              </p>
              
              <div class="summary-card">
                <div class="summary-header">Submission Summary</div>
                <div class="summary-subject">Subject: ${subject || 'General Inquiry'}</div>
                <p class="summary-text">${message}</p>
              </div>

              <p class="text">
                I review all incoming messages carefully and will respond to you as soon as possible.
              </p>

              <div class="signature">
                <div class="sig-name">Abhinav Chauhan</div>
                <div class="sig-title">Software Developer & Cybersecurity Researcher</div>
              </div>
            </div>
            <div class="footer">
              <div class="social-links">
                <a href="https://github.com/abhinaavchauhan" target="_blank">GitHub</a>
                <a href="https://linkedin.com/in/abhinaavchauhan" target="_blank">LinkedIn</a>
              </div>
              <div>Designed & Built by Abhinav Chauhan © ${new Date().getFullYear()}</div>
            </div>
          </div>
        </body>
        </html>
      `
    });

    // Dispatch emails asynchronously in background for immediate response
    Promise.all([ownerMailPromise, thankYouMailPromise]).then(() => {
      console.log(`[Send-Email API] Successfully sent emails for ${visitorEmail}`);
    }).catch((err) => {
      console.error('[Send-Email API] Background SMTP Error:', err);
    });

    return res.status(200).json({ success: true, message: 'Emails sent successfully!' });
  } catch (err) {
    console.error('Email API Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
