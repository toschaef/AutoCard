// /server/src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../types/User';

export const register = async (req: Request, res: Response) => {
  try {
    // Extract user details from request body
    const { email, password, name } = req.body;

    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Note that the password is hashed by the User type pre-save hook
    const newUser = new User({
      email,
      password,
      name,
    });

    // post user
    const savedUser = await newUser.save();
    console.log("REGISTERED USER:", savedUser)

    // remove password
    savedUser.password = undefined; 

    // Respond with success and user data
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {

    // Respond with error
    res.status(500).json({ message: 'Server error during registration.', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Extract user details from request body
    const { email, password } = req.body;

    // Check for required fields, return 400 if missing required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // Explicitly select the password field
    
    // If user not found, return invalid credentials
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Compare provided password with stored hash
    if (!user.password) {
      return res.status(500).json({ message: 'User password is not set.' });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Create JWT
    const jwtPayload = { id: user.id, email: user.email };
    const token = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET as string,
      { expiresIn: '6h' }
    );
    
    // Send token back to the client
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error: any) {

    // Respond with error
    res.status(500).json({ message: 'Server error during login.', error });
  }
};