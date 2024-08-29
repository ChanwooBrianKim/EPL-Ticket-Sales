import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import User from '../models/User';

// Define the type for the payload to be used in JWT
interface JwtPayload {
  user: {
    id: number;
  };
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ where: { email } });
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // // Create the new user
    // const newUser = await User.create({
    //   name,
    //   email,
    //   password: hashedPassword,
    // });
    // Create the new user
    
    user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false, // Or set to true if creating an admin user
    });

    // Create and sign a JWT token
    const payload: JwtPayload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    const errorMessage = (err as Error).message; // Cast to Error
    console.error(errorMessage);
    res.status(500).send('Server error');
  }
};
