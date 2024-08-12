const express = require('express'); // Importing Express.js
const { register, login } = require('../controllers/authController'); // Importing the register and login functions from the authController
const router = express.Router(); // Creating a new router

// Define the routes
router.post('/register', register); 
router.post('/login', login);

module.exports = router;
