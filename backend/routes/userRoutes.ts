import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import { updatePassword, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Get user profile
router.get('/me', authenticateToken, getUserProfile);

// Update password
router.post('/update-password', authenticateToken, updatePassword);

export default router;
