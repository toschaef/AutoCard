import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. Define the TypeScript Interface, including custom methods
export interface IUser extends Document {
  email: string;
  password?: string; // Password is required on the document after creation
  name: string;
  score: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 2. Create the Mongoose Schema
const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
  },
  score: {
    type: Number,
    default: 0,
  },
});

// Hash password before saving the document
userSchema.pre<IUser>('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    // We need to pass the error to the next middleware
    // Mongoose has type issues with next(error), so we cast it to any
    next(err as any);
  }
});

// Add a method to the schema to compare passwords
userSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// 3. Create and export the Mongoose Model
export default mongoose.model<IUser>('User', userSchema);