// src/types.ts

export interface Card {
  id: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
  
export interface CardSet {
  id: string;
  title: string;
  topic: string;
  cards: Card[];
  created: Date;
}

export interface Player {
  id: string;
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