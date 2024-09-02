import express from 'express'; // Importing Express.js
import { register, login } from '../controllers/authController.js'; // Importing the register and login functions from the authController.ts file

// Creating a new router
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
