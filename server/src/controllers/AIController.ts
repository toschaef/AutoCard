// /server/src/helpers/initCardSet.ts

import { Card } from '../types';

// This is the data structure the generation function should return
type GeneratedCardData = Omit<Card, 'id' | 'userId'>;

/**
 * Generates a set of Kahoot-style questions based on a topic.
 * (This is the function your teammate will implement)
 * @param topic The topic for the quiz.
 * @param numberOfQuestions The number of questions to generate.
 * @returns A promise that resolves to an array of card data.
 */
export const initCardSet = async (
  topic: string,
  numberOfQuestions: number
): Promise<GeneratedCardData[]> => {
  console.log(`[Helper] initCardSet called for topic "${topic}"...`);

  // --- Your teammate's generation logic will go here ---
  // For now, it returns mock data to ensure the rest of the app works.

  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate work

  const mockCards: GeneratedCardData[] = Array.from({ length: numberOfQuestions }, (_, i) => ({
    question: `Generated question about ${topic}? #${i + 1}`,
    correct_answer: `Correct Answer #${i + 1}`,
    incorrect_answers: [
      `Incorrect Option A`,
      `Incorrect Option B`,
      `Incorrect Option C`,
    ],
  }));

  console.log('[Helper] Card set generation finished.');
  return mockCards;
};