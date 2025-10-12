import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the TypeScript Interface for the document
export interface IFlashcard extends Document {
  genre: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: 'easy' | 'medium' | 'hard';
}

// 2. Create the Mongoose Schema
const CardSchema: Schema = new Schema({
  genre: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true
  },
    incorrectAnswers: {
    type: [String], // Defines an array of strings
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['novice', 'intermediate', 'advance'] // Enforces specific values
  }
});

// 3. Create and export the Mongoose Model
export default mongoose.model<IFlashcard>('Card', CardSchema);