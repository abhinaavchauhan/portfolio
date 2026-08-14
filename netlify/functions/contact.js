import { validateInput, processContactSubmission } from '../../src/services/emailService.js';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: 'Method not allowed' })
    };
  }

  const clientIp = event.headers['client-ip'] || event.headers['x-forwarded-for'] || '127.0.0.1';

  try {
    const body = JSON.parse(event.body || '{}');
    const validation = validateInput(body);

    if (!validation.valid) {
      if (validation.isSpam) {
        return {
          statusCode: 200,
          body: JSON.stringify({ success: true, message: 'Message sent successfully' })
        };
      }
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: validation.error })
      };
    }

    const result = await processContactSubmission({
      ...validation.data,
      clientIp
    });

    return {
      statusCode: result.status,
      body: JSON.stringify({
        success: result.success,
        message: result.message
      })
    };
  } catch (err) {
    console.error('Netlify Function Contact Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Unable to send message' })
    };
  }
};
