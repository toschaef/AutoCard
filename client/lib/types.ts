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
