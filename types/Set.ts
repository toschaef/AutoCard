import mongoose, { Schema, Document, Types } from 'mongoose';

// 1. Define the TypeScript Interface
// Note: We use Types.ObjectId for references to other documents.
export interface ICardSet extends Document {
  user_id: Types.ObjectId;
  title: string;
  description: string;
  cards: Types.ObjectId[]; // An array of references to Flashcard documents
  created: Date;
}

// 2. Create the Mongoose Schema
const CardSetSchema: Schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assumes you have a 'User' model
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true, // Removes whitespace from the beginning and end
  },
  description: {
    type: String,
    required: false, // Descriptions are often optional
  },
  cards: [{
    type: Schema.Types.ObjectId,
    ref: 'Card', // Each item in the array is a reference to a Card
    default: [], // Default to an empty array
  }],
  created: {
    type: Date,
    default: Date.now, // Automatically sets the creation date
  },
});

// 3. Create and export the Mongoose Model
export default mongoose.model<ICardSet>('cardset', CardSetSchema);