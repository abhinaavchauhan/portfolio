import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api', contactRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

export default app;
