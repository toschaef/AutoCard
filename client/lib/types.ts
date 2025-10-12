// Core data types for the application

export interface Card {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface CardSet {
  id: string;
  userId: string;
  title: string;
  description: string;
  cards: Card[];
  created: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
