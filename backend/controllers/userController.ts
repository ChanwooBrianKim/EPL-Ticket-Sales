import { Request, Response } from 'express';
import User from '../models/User'; // Import your User model
import bcrypt from 'bcrypt';

// Get user profile
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user?.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// Update password
export const updatePassword = async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  
  try {
    const user = await User.findByPk(req.user?.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect' });

    // Update password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' });
  }
};
