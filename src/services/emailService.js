import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Rate Limiter in-memory store (IP => timestamps array)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean expired rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validTimestamps);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(clientIp = '127.0.0.1') {
  const now = Date.now();
  const timestamps = rateLimitMap.get(clientIp) || [];
  const validTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  validTimestamps.push(now);
  rateLimitMap.set(clientIp, validTimestamps);
  return true;
}

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function validateInput({ name, email, subject, message, honeypot }) {
  if (honeypot && String(honeypot).trim() !== '') {
    return { valid: false, isSpam: true, error: 'Spam detected' };
  }

  const trimmedName = String(name || '').trim();
  const trimmedEmail = String(email || '').trim().toLowerCase();
  const trimmedSubject = String(subject || '').trim();
  const trimmedMessage = String(message || '').trim();

  if (!trimmedName) {
    return { valid: false, error: 'Full Name is required.' };
  }
  if (trimmedName.length > 100) {
    return { valid: false, error: 'Full Name cannot exceed 100 characters.' };
  }

  if (!trimmedEmail) {
    return { valid: false, error: 'Email Address is required.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  if (!trimmedSubject) {
    return { valid: false, error: 'Subject is required.' };
  }
  if (trimmedSubject.length > 200) {
    return { valid: false, error: 'Subject cannot exceed 200 characters.' };
  }

  if (!trimmedMessage) {
    return { valid: false, error: 'Message is required.' };
  }
  if (trimmedMessage.length > 5000) {
    return { valid: false, error: 'Message cannot exceed 5000 characters.' };
  }

  return {
    valid: true,
    data: {
      name: trimmedName,
      email: trimmedEmail,
      subject: trimmedSubject,
      message: trimmedMessage
    }
  };
}

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

export async function processContactSubmission({ name, email, subject, message, clientIp = '127.0.0.1' }) {
  // Check Rate Limit
  if (!checkRateLimit(clientIp)) {
    return {
      status: 429,
      success: false,
      message: 'Too many requests. Please try again in a few minutes.'
    };
  }

  const user = process.env.SMTP_USER || process.env.EMAIL_USER || process.env.GMAIL_USER || 'kshatriyabhinavchauhan@gmail.com';
  const ownerEmail = process.env.CONTACT_RECEIVER || process.env.EMAIL_RECEIVER || process.env.GMAIL_RECEIVER || 'abhinavsirt@gmail.com';
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');

  if (!user || !pass) {
    console.error('SMTP Error: Missing SMTP authentication credentials in environment variables.');
    return {
      status: 500,
      success: false,
      message: 'Server mail configuration missing.'
    };
  }

  const transporter = getTransporter(user, pass);

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message);
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
    timeZone: 'Asia/Kolkata'
  });

  // 1. Owner Notification Mail (to abhinavsirt@gmail.com)
  const ownerMailOptions = {
    from: `"Abhinav Chauhan" <${user}>`,
    to: ownerEmail,
    replyTo: email, // Dynamic visitor email entered in form
    subject: `New Portfolio Inquiry — ${safeSubject}`,
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
                <td class="val"><strong>${safeName}</strong></td>
              </tr>
              <tr>
                <td class="label">Email</td>
                <td class="val"><a href="mailto:${safeEmail}">${safeEmail}</a></td>
              </tr>
              <tr>
                <td class="label">Subject</td>
                <td class="val">${safeSubject}</td>
              </tr>
              <tr>
                <td class="label">Date</td>
                <td class="val" style="color: #94a3b8; font-size: 13px;">${timestamp}</td>
              </tr>
            </table>

            <div class="msg-card">
              <div class="msg-header">Message Content</div>
              <p class="msg-body">${safeMessage}</p>
            </div>

            <div class="cta-wrap">
              <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(subject)}" class="btn">Reply to ${safeName}</a>
            </div>
          </div>
          <div class="footer">
            Automated notification sent from your portfolio website.
          </div>
        </div>
      </body>
      </html>
    `
  };

  // 2. Automated Thank-You Confirmation Mail (to visitor's dynamic email)
  const visitorMailOptions = {
    from: `"Abhinav Chauhan" <${user}>`,
    to: email, // Dynamic visitor email entered in form
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
            <h1 class="greeting">Hello ${safeName},</h1>
            <p class="text">
              Thank you for reaching out through my portfolio website. I have successfully received your inquiry and appreciate you taking the time to write.
            </p>
            
            <div class="summary-card">
              <div class="summary-header">Submission Summary</div>
              <div class="summary-subject">Subject: ${safeSubject}</div>
              <p class="summary-text">${safeMessage}</p>
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
  };

  try {
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(visitorMailOptions)
    ]);
    console.log(`[Email Service] Emails successfully sent for ${email}`);
    return {
      status: 200,
      success: true,
      message: 'Message sent successfully'
    };
  } catch (err) {
    console.error('[Email Service] Nodemailer SMTP Error:', err);
    return {
      status: 500,
      success: false,
      message: err.message || 'Unable to send message. Please try again later.'
    };
  }
}
