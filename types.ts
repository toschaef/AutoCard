// src/types.ts
  
// export interface CardSet {
//   id: string;
//   userId: string;
//   title: string;
//   description: string;
//   cards: [String];
//   created: Date;
// }

// export interface IUser {
//   email: string;
//   password?: string; // Password is optional on the document after creation
//   name: string;
//   score: number;
//   comparePassword(candidatePassword: string): Promise<boolean>;
// }

// // export interface GameSession extends Document {
//   hostId: string;
//   cardSet: CardSet;
//   players: Player[];
//   state: 'waiting' | 'playing' | 'ended';
//   currentQuestionIndex: number;
// }

// export default interface CreateCardSetParams {
//   name: string;
//   description: string;
//   initialCards: { front: string, back: string }[];
// }

// export default interface DeleteCardSetParams {
//   cardSetId: string;
// }