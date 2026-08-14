import { validateInput, processContactSubmission } from '../src/services/emailService.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

  try {
    const validation = validateInput(req.body || {});
    if (!validation.valid) {
      if (validation.isSpam) {
        return res.status(200).json({ success: true, message: 'Message sent successfully' });
      }
      return res.status(400).json({ success: false, message: validation.error });
    }

    const result = await processContactSubmission({
      ...validation.data,
      clientIp
    });

    return res.status(result.status).json({
      success: result.success,
      message: result.message
    });
  } catch (err) {
    console.error('API Contact Route Error:', err);
    return res.status(500).json({ success: false, message: 'Unable to send message' });
  }
}
