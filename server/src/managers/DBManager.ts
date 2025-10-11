import { User, CardSet, Card } from '../../../types'
import { db } from '../config/db'


/**
 * Manages all CRUD (Create, Read, Update, Delete) operations, simulating
 * interaction with a MongoDB database using in-memory Maps.
 */
class DBManager {
  // Simulate MongoDB Collections using Maps: ID -> Document
  private users: Map<string, User> = new Map();
  private cardSets: Map<string, CardSet> = new Map();

  /**
   * Utility to simulate MongoDB network latency.
   */
  private async simulateDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 50));
  }


  public async createUser(email: string, password: string): Promise<User> {

    const newUser: User = {
      id: crypto.randomUUID(),
      password,
      email,
      cardSetIds: [],
    };

    db.collection('users').insertOne(newUser);

    console.log(`[DB] Created User: ${newUser.username}`);
    return newUser;
  }

  /**
   * Retrieves a user document by ID from the 'users' collection.
   * @param userId The ID of the user to retrieve.
   * @returns The User object or null if not found.
   */
  public async getUser(userId: string): Promise<User | null> {

    db.collection('users').findOne({ id: userId });
    return this.users.get(userId) || null;
  }

  /**
   * Updates a user document.
   * @param userId The ID of the user to update.
   * @param updates Fields to update (e.g., { username: 'newname' }).
   * @returns The updated User object or null if the user was not found.
   */
  public async updateUser(userId: string, updates: Partial<Omit<User, 'id'>>): Promise<User | null> {

    const existingUser = this.getUser(userId);

    db.collection('users').updateOne({ _id: userId }, { $set: updates });
    const updatedUser = { ...existingUser, ...updates };
    this.users.set(userId, updatedUser);
    console.log(`[DB] Updated User: ${userId}`);
    return updatedUser;
  }

  /**
   * Deletes a user document.
   * @param userId The ID of the user to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  public async deleteUser(userId: string): Promise<boolean> {
    await this.simulateDelay();

    // In a real application, you would also delete all associated CardSets here.
    // In a real application: db.collection('users').deleteOne({ _id: userId });
    const wasDeleted = this.users.delete(userId);
    if (wasDeleted) {
        console.log(`[DB] Deleted User: ${userId}`);
    }
    return wasDeleted;
  }

  // ===============================
  // |      CARD SET OPERATIONS    |
  // ===============================

  /**
   * Creates a new card set document.
   * @param name The name of the card set.
   * @param description A brief description.
   * @param ownerId The ID of the user who owns this set.
   * @returns The newly created CardSet object.
   */
  public async createCardSet(name: string, description: string, ownerId: string): Promise<CardSet> {
    await this.simulateDelay();

    const newSet: CardSet = {
      id: crypto.randomUUID(),
      name,
      description,
      ownerId,
      createdAt: new Date(),
      cards: [],
    };

    // In a real application: db.collection('cardSets').insertOne(newSet);
    this.cardSets.set(newSet.id, newSet);

    // Update the User's list of owned sets (a $push operation in MongoDB)
    const owner = this.users.get(ownerId);
    if (owner) {
      owner.cardSetIds.push(newSet.id);
      this.users.set(ownerId, owner);
    }

    console.log(`[DB] Created CardSet: ${newSet.name}`);
    return newSet;
  }

  /**
   * Retrieves a card set document by ID.
   * @param cardSetId The ID of the card set to retrieve.
   * @returns The CardSet object or null if not found.
   */
  public async getCardSet(cardSetId: string): Promise<CardSet | null> {
    await this.simulateDelay();
    // In a real application: db.collection('cardSets').findOne({ _id: cardSetId });
    return this.cardSets.get(cardSetId) || null;
  }

  /**
   * Updates a card set document (metadata, not individual cards).
   * @param cardSetId The ID of the card set to update.
   * @param updates Fields to update (e.g., { name: 'new name' }).
   * @returns The updated CardSet object or null if not found.
   */
  public async updateCardSet(cardSetId: string, updates: Partial<Omit<CardSet, 'id' | 'cards'>>): Promise<CardSet | null> {
    await this.simulateDelay();

    const existingSet = this.cardSets.get(cardSetId);
    if (!existingSet) {
      return null;
    }

    // In a real application: db.collection('cardSets').updateOne({ _id: cardSetId }, { $set: updates });
    const updatedSet = { ...existingSet, ...updates };
    this.cardSets.set(cardSetId, updatedSet);
    console.log(`[DB] Updated CardSet: ${cardSetId}`);
    return updatedSet;
  }

  /**
   * Deletes a card set document.
   * @param cardSetId The ID of the card set to delete.
   * @returns True if deletion was successful, false otherwise.
   */
  public async deleteCardSet(cardSetId: string): Promise<boolean> {
    await this.simulateDelay();

    // In a real application: db.collection('cardSets').deleteOne({ _id: cardSetId });
    const existingSet = this.cardSets.get(cardSetId);
    if (existingSet) {
        // Remove from user's list (a $pull operation in MongoDB)
        const owner = this.users.get(existingSet.ownerId);
        if (owner) {
            owner.cardSetIds = owner.cardSetIds.filter(id => id !== cardSetId);
            this.users.set(owner.id, owner);
        }

        const wasDeleted = this.cardSets.delete(cardSetId);
        console.log(`[DB] Deleted CardSet: ${cardSetId}`);
        return wasDeleted;
    }

    return false;
  }

  // ===============================
  // | CARD (EMBEDDED) OPERATIONS  |
  // ===============================

  /**
   * Adds a new card to the cards array of an existing CardSet document.
   * @param cardSetId The ID of the set to modify.
   * @param front The text for the card front.
   * @param back The text for the card back.
   * @returns The new Card object.
   */
  public async addCardToSet(cardSetId: string, front: string, back: string): Promise<Card | null> {
    await this.simulateDelay();

    const set = this.cardSets.get(cardSetId);
    if (!set) {
      return null;
    }

    const newCard: Card = {
      id: crypto.randomUUID(),
      front,
      back,
      status: 'new',
    };

    // In a real application: db.collection('cardSets').updateOne({ _id: cardSetId }, { $push: { cards: newCard } });
    set.cards.push(newCard);
    this.cardSets.set(cardSetId, set);
    console.log(`[DB] Added Card to set: ${set.name}`);
    return newCard;
  }

  /**
   * Removes a card from the cards array of an existing CardSet document.
   * @param cardSetId The ID of the set.
   * @param cardId The ID of the card to remove.
   * @returns True if the card was removed, false otherwise.
   */
  public async removeCardFromSet(cardSetId: string, cardId: string): Promise<boolean> {
    await this.simulateDelay();

    const set = this.cardSets.get(cardSetId);
    if (!set) {
      return false;
    }

    const initialLength = set.cards.length;
    // In a real application: db.collection('cardSets').updateOne({ _id: cardSetId }, { $pull: { cards: { id: cardId } } });
    set.cards = set.cards.filter(card => card.id !== cardId);

    if (set.cards.length < initialLength) {
      this.cardSets.set(cardSetId, set);
      console.log(`[DB] Removed Card ${cardId} from set: ${set.name}`);
      return true;
    }

    return false;
  }
}