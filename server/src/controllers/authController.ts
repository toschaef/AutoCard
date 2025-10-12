// /server/src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../types/User';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    //const salt = await bcrypt.genSalt(10);
    //const hashedPassword = await bcrypt.hash(password, salt);

    const hashedPassword = password
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    // post user
    const savedUser = await newUser.save();
    // remove password
    savedUser.password = undefined; 

    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // Explicitly select the password field
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }


    // console.log(user)
    // Compare provided password with stored hash
    if (!user.password) {
      return res.status(500).json({ message: 'User password is not set.' });
    }

    // console.log(password, user.password)
    //const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password;
    // console.log(isMatch)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create JWT
    const jwtPayload = { id: user.id, email: user.email };
    const token = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' } // FIX THIS IF WORKING ON PROJECT AFTER HACKATHON
    );
    
    // Send token back to the client
    console.log("LOGIN SUCCESSFUL")
    res.status(200).json({ message: 'Login successful', token });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login.', error });
  }
};