// src/controllers/cardSetController.ts

import { Request, Response } from 'express';
import { CardSet, Card } from '../types';

// Dummy data store
const cardSets: { [key: string]: CardSet } = {};

// Create a new card set
export const createCardSet = (req: Request, res: Response) => {
  const newSetId = `set-${Date.now()}`;
  const newSet: CardSet = {
    id: newSetId,
    title: req.body.title || 'Untitled Set',
    cards: [],
  };
  cardSets[newSetId] = newSet;
  res.status(201).json(newSet);
};

// Get all card sets
export const getAllCardSets = (req: Request, res: Response) => {
  res.json(Object.values(cardSets));
};

// Get a single card set
export const getCardSetById = (req: Request, res: Response) => {
  const { setId } = req.params;
  const cardSet = cardSets[setId];
  if (!cardSet) {
    return res.status(404).send('Card set not found.');
  }
  res.json(cardSet);
};

// Add a new card to a set
export const addCardToSet = (req: Request, res: Response) => {
  const { setId } = req.params;
  const cardSet = cardSets[setId];
  if (!cardSet) {
    return res.status(404).send('Card set not found.');
  }
  const newCardId = `card-${Date.now()}`;
  const newCard: Card = {
    id: newCardId,
    question: req.body.question,
    answer: req.body.answer,
  };
  cardSet.cards.push(newCard);
  res.status(201).json(newCard);
};

// Update a card in a set
export const updateCard = (req: Request, res: Response) => {
  const { setId, cardId } = req.params;
  const cardSet = cardSets[setId];
  if (!cardSet) {
    return res.status(404).send('Card set not found.');
  }
  const cardIndex = cardSet.cards.findIndex(c => c.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).send('Card not found.');
  }
  const updatedCard = {
    ...cardSet.cards[cardIndex],
    question: req.body.question || cardSet.cards[cardIndex].question,
    answer: req.body.answer || cardSet.cards[cardIndex].answer,
  };
  cardSet.cards[cardIndex] = updatedCard;
  res.json(updatedCard);
};

// Delete a card from a set
export const deleteCard = (req: Request, res: Response) => {
  const { setId, cardId } = req.params;
  const cardSet = cardSets[setId];
  if (!cardSet) {
    return res.status(404).send('Card set not found.');
  }
  cardSet.cards = cardSet.cards.filter(c => c.id !== cardId);
  res.status(204).send();
};

export const getCardSets = () => cardSets;