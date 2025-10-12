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

    // If the set is found, return the populated 'cards' array
    res.status(200).json(cardSet);
    
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Get a single card by ID from a specific set
export const getCardById = async (req: Request, res: Response) => {
    const { cardId } = req.params;
    try {
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
    // get cardId from params
    const { cardId } = req.params;
    // get card from db
    const card = await Card.findById(cardId);
    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }
    // update card fields
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
export const deleteCard = (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    // Find the card by its ID and delete it
    Card.findByIdAndDelete(cardId)
      .then(() => res.status(204).send())
      .catch((error: any) => {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error' });
      });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
