import nodemailer from 'nodemailer';

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

export async function processContactSubmission({ name, email, subject, message, clientIp = '127.0.0.1' }) {
  // Check Rate Limit
  if (!checkRateLimit(clientIp)) {
    return {
      status: 429,
      success: false,
      message: 'Too many requests. Please try again in a few minutes.'
    };
  }

  const user = process.env.EMAIL_USER;
  const rawPass = process.env.EMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');

  if (!user || !pass) {
    console.error('SMTP Error: Missing EMAIL_USER or EMAIL_APP_PASSWORD in environment variables.');
    return {
      status: 500,
      success: false,
      message: 'Server mail configuration missing.'
    };
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

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
    from: `"Portfolio Contact" <${user}>`,
    to: user,
    replyTo: email, // Directly reply to the visitor
    subject: `New Portfolio Contact — ${safeName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #0a0a0a; color: #e2e8f0; margin: 0; padding: 20px; }
          .card { max-width: 600px; margin: 0 auto; background: #141417; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); color: #00f0ff; border-radius: 20px; font-size: 12px; font-weight: 600; margin-bottom: 20px; }
          .heading { font-size: 24px; font-weight: 700; color: #ffffff; margin: 0 0 16px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 12px; }
          .field { margin-bottom: 16px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; font-weight: 600; margin-bottom: 4px; }
          .val { font-size: 15px; color: #ffffff; }
          .msg-box { background: rgba(255, 255, 255, 0.04); border-left: 3px solid #00f0ff; padding: 16px; border-radius: 8px; margin-top: 20px; font-size: 14px; color: #cbd5e1; white-space: pre-wrap; }
          .btn { display: inline-block; margin-top: 24px; padding: 12px 24px; background: #00f0ff; color: #000000; font-weight: 700; text-decoration: none; border-radius: 30px; font-size: 14px; }
          .footer { margin-top: 24px; font-size: 12px; color: #64748b; text-align: center; }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="badge">NEW PORTFOLIO CONTACT</div>
          <h1 class="heading">You have received a new message</h1>
          
          <div class="field">
            <div class="label">Name</div>
            <div class="val">${safeName}</div>
          </div>
          
          <div class="field">
            <div class="label">Email</div>
            <div class="val"><a href="mailto:${safeEmail}" style="color: #00f0ff;">${safeEmail}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Subject</div>
            <div class="val">${safeSubject}</div>
          </div>
          
          <div class="field">
            <div class="label">Submitted</div>
            <div class="val" style="color: #94a3b8; font-size: 13px;">${timestamp}</div>
          </div>
          
          <div class="msg-box">
            <div class="label" style="color: #00f0ff; margin-bottom: 8px;">Message</div>
            ${safeMessage}
          </div>
          
          <a href="mailto:${safeEmail}?subject=Re: ${encodeURIComponent(subject)}" class="btn">Reply to ${safeName}</a>
          
          <div class="footer">
            Portfolio Contact System • ${timestamp}
          </div>
        </div>
      </body>
      </html>
    `
  };

  // 2. Automated Thank-You Confirmation Mail (to visitor)
  const visitorMailOptions = {
    from: `"Abhinav Chauhan" <${user}>`,
    to: email,
    subject: `Thank You for Contacting Me`,
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
            <h1 class="title">Hello ${safeName},</h1>
            <p class="text">
              Thank you for reaching out through my portfolio.
            </p>
            <p class="text">
              I have received your message regarding:
            </p>
            <div class="summary-box">
              <div class="summary-label">Subject: ${safeSubject}</div>
              <p class="summary-text">${safeMessage}</p>
            </div>
            <p class="text">
              I appreciate you taking the time to contact me. I will review your message and get back to you as soon as possible.
            </p>
            <p class="text" style="margin-bottom: 0;">
              Best regards,<br><br>
              <strong style="color: #ffffff;">Abhinav Chauhan</strong><br>
              <span style="font-size: 13px; color: #64748b;">Software Developer | Cybersecurity</span>
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
  };

  try {
    await Promise.all([
      transporter.sendMail(ownerMailOptions),
      transporter.sendMail(visitorMailOptions)
    ]);

    return {
      status: 200,
      success: true,
      message: 'Message sent successfully'
    };
  } catch (err) {
    console.error('Nodemailer SMTP Error:', err);
    return {
      status: 500,
      success: false,
      message: 'Unable to send message'
    };
  }
}
