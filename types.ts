// src/types.ts

export interface Card {
  id: string;
  userId: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
  
export interface CardSet {
  id: string;
  userId: string;
  title: string;
  description: string;
  topic: string;
  cards: Card[];
  created: Date;
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