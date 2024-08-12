import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js'; // Correctly importing the auth routes

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Use authRoutes for /api/auth path
app.use('/api/auth', authRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
