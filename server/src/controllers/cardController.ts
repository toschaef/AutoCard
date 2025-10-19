// src/controllers/cardController.ts

import { Request, Response } from 'express';
import CardSet from '../types/Set';
import Card from '../types/Card';

// Get all cards from a specific set
export const getCardsBySetId = async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;

    // Find the CardSet by its ID and use populate() to get the full card documents
    const cardSet = await CardSet.findById(setId).populate('cards');

    // If no set is found with that ID, return a 404 error
    if (!cardSet) {
      return res.status(404).json({ message: 'Card set not found.' });
    }

    // If the actual cards and the references are out of sync, clean up the references
    // remove any null entries from the cards array as well
    if (cardSet.cards.length !== cardSet.cards.filter(card => card !== null).length) {
      CardSet.updateOne(
        { _id: setId },
        { cards: cardSet.cards.filter(card => card !== null).map(card => card._id) }
      ).catch((error: any) => console.error("Error cleaning up card references:", error));
    }

    cardSet.cards = cardSet.cards.filter(card => card !== null);

    // If the set is found, return the populated 'cards' array
    res.status(200).json(cardSet);
    
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Get a single card by ID from a specific set
export const getCardById = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(card);

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Create a new card in a specific set
export const createCard = async (req: Request, res: Response) => {
  try {
    const { genre, question, correctAnswer, incorrectAnswers, difficulty } = req.body;
    const newCard = new Card({
      user_id: req.body.userId,
      genre,
      question,
      correctAnswer,
      incorrectAnswers,
      difficulty
    });
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Update an existing card
export const updateCard = async (req: Request, res: Response) => {
  try {
    // Get cardId from params
    const { cardId } = req.params;
    const { userId } = req.body;

    // Get card from db
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Verify the user is the owner of the card
    if (card.user_id.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to update this card' });
    }

    // Update card fields
    const { genre, question, correctAnswer, incorrectAnswers, difficulty } = req.body;
    if (genre) card.genre = genre;
    if (question) card.question = question;
    if (correctAnswer) card.correctAnswer = correctAnswer;
    if (incorrectAnswers) card.incorrectAnswers = incorrectAnswers;
    if (difficulty) card.difficulty = difficulty;

    const updatedCard = await card.save();
    res.status(200).json(updatedCard);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Delete a card from a set
export const deleteCard = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const { userId } = req.body;

    // Find the card by its ID and delete it
    const card = await Card.findById(cardId);

    // Verify the card exists
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Verify the user is the owner of the card
    if (card.user_id.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this card' });
    }

    // Delete the card
    Card.findByIdAndDelete(cardId)
      .then(() => res.status(204).send())
      .catch((error: any) => {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
      });

    // Delete the card from any CardSets that contain it
    await CardSet.updateMany(
      { cards: cardId },
      { $pull: { cards: cardId } }
    );
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
