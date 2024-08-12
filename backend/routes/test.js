import express from 'express';

// Create a router
const router = express.Router();

// Define a route handler for the default home page
router.get('/', (req, res) => {
  res.send('Welcome to the auth route!');
});

// Define a route handler for the register endpoint
router.post('/register', (req, res) => {
  // Handle user registration logic here
  res.send('User registered!');
});

// Export the router
export default router;