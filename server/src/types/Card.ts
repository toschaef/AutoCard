import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the TypeScript Interface for the document
export interface IFlashcard extends Document {
  user_id: mongoose.Types.ObjectId;
  genre: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: 'novice' | 'intermediate' | 'advanced';
}

// 2. Create the Mongoose Schema
const CardSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  genre: {
    type: String,
  },
  question: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
    incorrectAnswers: {
    type: [String], // Defines an array of strings
  },
  difficulty: {
    type: String,
    enum: ['any', 'novice', 'intermediate', 'advanced'] // Enforces specific values
  }
});

// 3. Create and export the Mongoose Model
export default mongoose.model<IFlashcard>('Card', CardSchema);