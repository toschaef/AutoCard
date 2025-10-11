import { CardSet, Card, CreateCardSetParams, DeleteCardSetParams } from '../../../types';
import { initCardSet } from '../utils';

  class CardSetManager {
    private cardSets: Map<string, CardSet> = new Map(); // Simple in-memory storage for demonstration

    public async createCardSet(params: CreateCardSetParams): Promise<CardSet> {
      console.log(`Attempting to create a new card set: ${params.name}`);
  
      const newCardSetId = crypto.randomUUID();
      const now = new Date();
  
      const initialCards: Card[] = initCardSet();
  
      const newCardSet: CardSet = {
        id: newCardSetId,
        userId: params.userId,
        title: params.title,
        description: params.description,
        topic: params.topic,
        created: now,
        cards: initialCards,
      };
  

      DBManager.postCardSet(newCardSet);
  
      console.log(`Successfully created card set with ID: ${newCardSetId}`);
  
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 50));
  
      return newCardSet;
    }
  
    /**
     * Deletes a card set based on its ID.
     *
     * @param params - The ID of the card set to delete.
     * @returns A Promise that resolves to true if deletion was successful, or false if the set was not found.
     */
    public async deleteCardSet(params: DeleteCardSetParams): Promise<boolean> {
      console.log(`Attempting to delete card set with ID: ${params.cardSetId}`);
  
      // In a real application, this is where you'd interact with a database (e.g., Firestore delete or an API DELETE request).
  
      // 1. Check if the set exists
      const exists = this.cardSets.has(params.cardSetId);
  
      if (exists) {
        // 2. Remove from storage/database (using Map for this boilerplate)
        this.cardSets.delete(params.cardSetId);
        console.log(`Successfully deleted card set with ID: ${params.cardSetId}`);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 50));
        return true;
      } else {
        console.warn(`Deletion failed: Card set with ID ${params.cardSetId} not found.`);
        return false;
      }
    }
  
    // Helper function to show current state (for testing/debugging)
    public listCardSets(): CardSet[] {
      return Array.from(this.cardSets.values());
    }
  }