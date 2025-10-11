// src/types.ts

export interface Card {
    id: string;
    question: string;
    answer: string;
  }
  
  export interface CardSet {
    id: string;
    title: string;
    cards: Card[];
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