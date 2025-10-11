import { Card } from '@/types';


export function buildAnswers(card: Card): { text: string; isCorrect: boolean }[] {
  const allAnswers = [card.correct_answer, ...card.incorrect_answers];
  const answers = allAnswers.map((text, index) => ({
    text,
    isCorrect: index === 0
  }));
  
  // Fisher-Yates shuffle
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
  
  return answers;
}

export function splitSides<T>(items: T[]): { left: T[]; right: T[] } {
  const len = items.length;
  
  if (len === 2) {
    return { left: [items[0]], right: [items[1]] };
  }
  
  if (len === 3) {
    return { left: [items[0], items[1]], right: [items[2]] };
  }
  
  if (len === 4) {
    return { left: [items[0], items[1]], right: [items[2], items[3]] };
  }
  
  // For other lengths, balance as evenly as possible with left favoring extra
  const leftCount = Math.ceil(len / 2);
  return {
    left: items.slice(0, leftCount),
    right: items.slice(leftCount)
  };
}

export function classNames(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
