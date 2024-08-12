// backend/server.js

const express = require('express'); // Importing Express.js
const cors = require('cors'); // Importing CORS middleware
const bodyParser = require('body-parser'); // Importing body-parser for parsing request bodies

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Example route (you would add more routes or import them from other files)
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Import your authentication routes (assuming you have them in backend/routes/authRoutes.js)
// const authRoutes = require('./routes/authRoutes');
// app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
