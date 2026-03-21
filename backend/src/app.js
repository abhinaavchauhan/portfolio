import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

app.use(cors({
  origin: [
    "https://abhinaavchauhan.netlify.app",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ],
  credentials: true
}));
app.use(express.json());

// Main API Routes
app.use('/api', contactRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

export default app;
