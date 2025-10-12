
// 1. Define the TypeScript Interface for the document

export interface Card {
    id: string;
    genre: string;
    question: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    difficulty: 'easy' | 'medium' | 'hard';
  }

export interface CardSet{
user_id: string;
title: string;
description: string;
cards: string[]; // An array of references to Flashcard documents
created: Date;
}

export interface User{
    email: string;
    password?: string; // Password is optional on the document after creation
    name: string;
    score: number;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }