// /src/managers/DBManager.ts

import { Collection } from 'mongodb';
import { db } from './config/db';
import { Card, CardSet, GameSession, Player } from '../types';
import { generateQuizCards } from '../utils/generation'; // <-- Import utility

// (GameSession methods from previous example would go here...)

export class DBManager {
  private cardSets: Collection<CardSet>;
  private gameSessions: Collection<GameSession>;
  private users: Collection<Player>;

  constructor() {
    this.cardSets = db.collection<CardSet>('cardSets');
    this.gameSessions = db.collection<GameSession>('gameSessions');
    this.users = db.collection<Player>('users');
  }

  /**
   * Creates a new card set document in the database.
   * It now uses a utility for card generation.
   */
  public async createCardSet(params: {
    userId: string;
    title: string;
    description: string;
    topic: string;
    initialCards: { front: string; back: string }[];
  }): Promise<CardSet> {
    // 1. Call the generic utility to handle card generation
    const generatedCards = generateQuizCards(params.initialCards, params.userId);

    // 2. Build the new CardSet object
    const newCardSet: CardSet = {
      id: crypto.randomUUID(),
      userId: params.userId,
      title: params.title,
      description: params.description,
      topic: params.topic,
      cards: generatedCards, // Use the generated cards
      created: new Date(),
    };

    // 3. Insert into the database
    await this.cardSets.insertOne(newCardSet);
    console.log(`[DB] Created CardSet: ${newCardSet.title}`);
    return newCardSet;
  }
  
  /**
   * Retrieves all card sets for a specific user.
   */
  public async getCardSetsForUser(userId: string): Promise<CardSet[]> {
    return this.cardSets.find({ userId }).toArray();
  }

  /**
   * Deletes a card set by its ID.
   */
  public async deleteCardSet(cardSetId: string): Promise<boolean> {
    const result = await this.cardSets.deleteOne({ id: cardSetId });
    return result.deletedCount === 1;
  }

    public async findUserByEmail(email: string): Promise<User | null> {
    return this.users.findOne({ email });
  }

  /**
   * Creates a new card and pushes it into a specific CardSet's embedded array.
   * @param setId The ID of the CardSet to modify.
   * @param cardData The data for the new card.
   * @returns The newly created Card object or null if the set doesn't exist.
   */
  public async addCardToSet(
    setId: string,
    cardData: Omit<Card, 'id'>
  ): Promise<Card | null> {
    const newCard: Card = {
      id: crypto.randomUUID(),
      ...cardData,
    };

    const result = await this.cardSets.updateOne(
      { id: setId },
      { $push: { cards: newCard } }
    );

    if (result.modifiedCount === 1) {
      return newCard; // Return the full card object on success
    }

    return null; // Return null if the card set wasn't found or updated
  }
  
  public async getCardSetById(setId: string): Promise<CardSet | null> {
    return this.cardSets.findOne({ id: setId });
  }

  public async getAllPublicCardSets(): Promise<CardSet[]> {
    // For a public "discover" page, you might want to add pagination later
    return this.cardSets.find({}).toArray();
  }

  public async updateCardSet(
    setId: string,
    updates: Partial<Omit<CardSet, 'id' | 'userId' | 'cards'>>
  ): Promise<CardSet | null> {
    const result = await this.cardSets.findOneAndUpdate(
      { id: setId },
      { $set: updates },
      { returnDocument: 'after' }
    );
    return result;
  }

  public async updateCardInSet(
    setId: string,
    cardId: string,
    updates: Partial<Omit<Card, 'id' | 'userId'>>
  ): Promise<boolean> {
    // Create the $set object for the fields to update
    const updateFields: { [key: string]: any } = {};
    for (const key in updates) {
      updateFields[`cards.$.${key}`] = (updates as any)[key];
    }

    const result = await this.cardSets.updateOne(
      { id: setId, 'cards.id': cardId },
      { $set: updateFields }
    );
    return result.modifiedCount === 1;
  }

  public async removeCardFromSet(setId: string, cardId: string): Promise<boolean> {
    const result = await this.cardSets.updateOne(
      { id: setId },
      { $pull: { cards: { id: cardId } } }
    );
    return result.modifiedCount === 1;
  }

  /**
   * Creates a new user document in the database.
   * @param email The user's email.
   * @param passwordHash The bcrypt-hashed password.
   * @returns The newly created user object, without the password.
   */
  public async createUser(email: string, passwordHash: string): Promise<Omit<User, 'password'>> {
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password: passwordHash,
      // Add any other default fields for a new user here
    };

    await this.users.insertOne(newUser);
    
    // Return the user object without the password hash
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}