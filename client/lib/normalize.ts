import { Card, CardSet } from '@/types/types';

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


// A new type to define the shape of our normalized output
interface NormalizedData {
  set: CardSet;
  cards: Card[];
}

export function normalizeIncomingSet(input: unknown): NormalizedData {
  // We can no longer just check for CardSet, as the structure is different.
  // In a real app, you'd have more robust validation.
  
  if (isIncomingSet(input)) {
    // First, create all the full card objects with new IDs
    const normalizedCards: Card[] = input.cards.map(card => ({
      id: generateId(), // Assuming generateId() creates a unique string ID
      question: card.question,
      correctAnswer: card.correctAnswer,
      incorrectAnswers: card.incorrectAnswers,
      genre: "general",
      difficulty: "medium"
    }));

    // Next, create the set object, using only the IDs from the cards we just made
    const normalizedSet: CardSet = {
      id: generateId(),
      title: input.setName,
      description: input.setDescription,
      userId: input.userId,
      cardIds: normalizedCards.map(card => card.id), // ✅ Create an array of just the IDs
      created: new Date()
    };

    // Finally, return both collections
    return {
      set: normalizedSet,
      cards: normalizedCards
    };
  }

  throw new Error("Invalid input format provided to normalizeIncomingSet");
}

// Helper function to check the incoming data format (you would need this)
function isIncomingSet(data: any): data is IncomingSet {
  return data && typeof data.setName === 'string' && Array.isArray(data.cards);
}

// Placeholder for a unique ID generator
function generateId(): string {
  return `id_${Math.random().toString(36).substr(2, 9)}`;
}
