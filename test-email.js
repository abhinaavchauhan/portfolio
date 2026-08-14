import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const user = process.env.EMAIL_USER || process.env.GMAIL_USER || 'abhinavsirt@gmail.com';
const pass = (process.env.EMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASS || '').replace(/\s+/g, '');

console.log('--------------------------------------------------');
console.log('Portfolio Email Service Diagnostic Tool');
console.log('--------------------------------------------------');
console.log(`Configured Email: ${user}`);
console.log(`Password Length: ${pass.length} characters`);
console.log('--------------------------------------------------');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user, pass }
});

transporter.verify(async (err) => {
  if (err) {
    console.error('❌ Connection Failed: Invalid App Password in .env');
    console.error(`Error details: ${err.message}`);
    console.log('\n--> Fix: Generate a 16-character App Password at: https://myaccount.google.com/apppasswords');
    process.exit(1);
  } else {
    console.log('✅ Connection Successful! Sending test email...');
    
    try {
      await transporter.sendMail({
        from: `"Portfolio Test" <${user}>`,
        to: user,
        subject: 'Portfolio Email Service Test Success! 🎉',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #0a0a0a; color: #fff; border-radius: 10px;">
            <h2 style="color: #00f0ff;">Portfolio Mail Service Active</h2>
            <p>Your portfolio mail service is properly connected and ready to receive contact form submissions and send Thank You confirmation emails!</p>
          </div>
        `
      });
      console.log('🎉 Test email sent successfully to ' + user + '!');
    } catch (sendErr) {
      console.error('Failed to send test email:', sendErr.message);
    }
  }
});
