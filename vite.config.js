import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

import { validateInput, processContactSubmission } from './src/services/emailService.js'

const emailPlugin = () => ({
  name: 'email-api-plugin',
  configureServer(server) {
    const handler = async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        return res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
      }

      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const parsedBody = JSON.parse(body || '{}');
          const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';

          const validation = validateInput(parsedBody);
          if (!validation.valid) {
            if (validation.isSpam) {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true, message: 'Message sent successfully' }));
            }
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ success: false, message: validation.error }));
          }

          const result = await processContactSubmission({
            ...validation.data,
            clientIp
          });

          res.statusCode = result.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({
            success: result.success,
            message: result.message
          }));
        } catch (err) {
          console.error('Vite Email Dev Handler Error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: false, message: 'Unable to send message' }));
        }
      });
    };

    server.middlewares.use('/api/contact', handler);
    server.middlewares.use('/api/send-email', handler);
  }
});

export default defineConfig({
  plugins: [react(), emailPlugin()],
  build: {
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
})
