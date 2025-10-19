// /server/src/middleware/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../types/User';
import mongoose from 'mongoose';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    // Get token from Authorization header
    let token = req.headers["authorization"];
 
    // If no token is provided, return 403 (forbidden) error
    if (!token) {
      return res.status(403).json({ message: "No token provided!" });
    }
 
    // Remove 'Bearer ' prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
 
    // Verify token and extract user ID
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: mongoose.Types.ObjectId };
      req.body["userId"] = decoded.id;

      // Fetch user details
      const user = await User.findById(req.body["userId"]).select('-password');
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }

      next();
    } catch (err) {
      // If token is invalid or expired, return 401 (unauthorized) error
      return res.status(401).json({ message: "Unauthorized!" });
    }
};

export default verifyToken;