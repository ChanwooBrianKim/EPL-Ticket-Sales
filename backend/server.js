const express = require('express'); // Importing Express.js
const cors = require('cors'); // Importing CORS middleware
const bodyParser = require('body-parser'); // Importing body-parser for parsing request bodies

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Import routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);  // This ensures that /api/auth/register is routed correctly

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  