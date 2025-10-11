import { Card, CardSet } from '@/types';

interface IncomingCard {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

interface IncomingSet {
  setName: string;
  setDescription: string;
  userId: string;
  cards: IncomingCard[];
}

export function normalizeIncomingSet(input: unknown): CardSet {
  // If already a CardSet, return as-is
  if (isCardSet(input)) {
    return input;
  }

  // Check if it's the incoming format
  if (isIncomingSet(input)) {
    return {
      id: generateId(),
      title: input.setName,
      topic: input.setDescription,
      userId: input.userId,
      cards: input.cards.map(card => ({
        id: generateId(),
        question: card.question,
        correct_answer: card.correctAnswer,
        incorrect_answers: card.incorrectAnswers
      })),
      created: new Date()
    };
  }

  throw new Error('Invalid input format');
}

function isCardSet(input: unknown): input is CardSet {
  return (
    typeof input === 'object' &&
    input !== null &&
    'id' in input &&
    'title' in input &&
    'topic' in input &&
    'cards' in input &&
    'created' in input
  );
}

function isIncomingSet(input: unknown): input is IncomingSet {
  return (
    typeof input === 'object' &&
    input !== null &&
    'setName' in input &&
    'setDescription' in input &&
    'cards' in input &&
    Array.isArray((input as IncomingSet).cards)
  );
}

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}
