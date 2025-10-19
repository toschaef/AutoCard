export interface Card {
  _id: string;
  genre: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  difficulty: 'novice' | 'intermediate' | 'advanced';
}

export interface CardSet {
  _id: string;
  user_id: string;
  title: string;
  description: string;
  cards: string[]; // An array of references to Flashcard documents
  created: Date;
}

export interface User {
  _id: string | null;
  email: string;
  password?: string; // Password is optional on the document after creation
  name: string;
  score: number;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface Prompt {
  prompt: string;
  genre: string;
  numProblemsPerGenre: number;
  difficulty: 'any' | 'novice' | 'intermediate' | 'advanced';
}