// src/types.ts

export interface Card {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface CardSet extends Document {
  id: string;
  userId: string;
  title: string;
  description: string;
  cards: Card[];
  cards: [String];
  created: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface Player extends Document {
  id: string;
  email: string;
  password: string;
  name: string;
  score: number;
}

export interface GameSession extends Document {
  hostId: string;
  cardSet: CardSet;
  players: Player[];
  state: 'waiting' | 'playing' | 'ended';
  currentQuestionIndex: number;
}

export default interface CreateCardSetParams extends Document {
  name: string;
  description: string;
  initialCards: { front: string, back: string }[];
}

export default interface DeleteCardSetParams extends Document {
  cardSetId: string;
}