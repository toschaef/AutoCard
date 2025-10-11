// /server/src/managers/CardSetManager.ts

import { CardSet } from '../types';
import { DBManager } from '../db/DBManager';
import { initCardSet } from '../helpers/initCardSet'; // --- CHANGE HERE ---

export interface GenerationParams {
  userId: string;
  title: string;
  description: string;
  topic: string;
  numberOfQuestions: number;
}

export default class CardSetManager {
  private dbManager: DBManager;

  constructor() {
    this.dbManager = new DBManager();
  }

  /**
   * Orchestrates the creation of a new card set by calling the initCardSet helper.
   */
  public async generateAndCreateCardSet(params: GenerationParams): Promise<CardSet> {
    console.log(`[Manager] Starting generation for set: "${params.title}"`);

    // Step 1: Call the helper to get the generated cards
    // --- CHANGE HERE ---
    const generatedCardsData = await initCardSet(
      params.topic,
      params.numberOfQuestions
    );

    // Step 2: Call the DBManager to save the complete set
    const newCardSet = await this.dbManager.createCardSet({
      userId: params.userId,
      title: params.title,
      description: params.description,
      topic: params.topic,
      cards: generatedCardsData,
    });

    console.log(`[Manager] Successfully created and saved set ID: ${newCardSet.id}`);
    return newCardSet;
  }
}