// src/types.ts

export interface Card {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
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
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface Player {
  id: string;
  email: string;
  password: string;
  name: string;
  score: number;
}

export interface GameSession {
  hostId: string;
  cardSet: CardSet;
  players: Player[];
  state: 'waiting' | 'playing' | 'ended';
  currentQuestionIndex: number;
}

export default interface CreateCardSetParams {
  name: string;
  description: string;
  initialCards: { front: string, back: string }[];
}

export default interface DeleteCardSetParams {
  cardSetId: string;
}