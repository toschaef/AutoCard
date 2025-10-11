// src/controllers/cardController.ts

import { Request, Response } from 'express';
import { Card, CardSet } from '../../../types';
import { getCardSets } from './cardSetController';

const dbManager = new DBManager();

// Get all cards from a specific set
export const getCardsBySetId = (req: Request, res: Response) => {
  const { setId } = req.params;
  const cardSets = getCardSets();
  const cardSet = cardSets[setId];
  
  if (!cardSet) {
    return res.status(404).json({ error: 'Card set not found' });
  }
  
  res.json(cardSet.cards);
};

// Get a single card by ID from a specific set
export const getCardById = (req: Request, res: Response) => {
  const { setId, cardId } = req.params;
  const cardSets = getCardSets();
  const cardSet = cardSets[setId];
  
  if (!cardSet) {
    return res.status(404).json({ error: 'Card set not found' });
  }
  
  const card = cardSet.cards.find(c => c.id === cardId);
  if (!card) {
    return res.status(404).json({ error: 'Card not found' });
  }
  
  res.json(card);
};

// Create a new card in a specific set
export const createCard = (req: Request, res: Response) => {
  const { setId } = req.params;
  const { question, answer } = req.body;
  
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }
  
  const cardSets = getCardSets();
  const cardSet = cardSets[setId];
  
  if (!cardSet) {
    return res.status(404).json({ error: 'Card set not found' });
  }
  
  const newCardId = `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newCard: Card = {
    id: newCardId,
    question: question.trim(),
    answer: answer.trim(),
  };
  
  cardSet.cards.push(newCard);
  res.status(201).json(newCard);
};

// Update an existing card
export const updateCard = (req: Request, res: Response) => {
  const { setId, cardId } = req.params;
  const { question, answer } = req.body;
  
  const cardSets = getCardSets();
  const cardSet = cardSets[setId];
  
  if (!cardSet) {
    return res.status(404).json({ error: 'Card set not found' });
  }
  
  const cardIndex = cardSet.cards.findIndex(c => c.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ error: 'Card not found' });
  }
  
  const updatedCard = {
    ...cardSet.cards[cardIndex],
    question: question ? question.trim() : cardSet.cards[cardIndex].question,
    answer: answer ? answer.trim() : cardSet.cards[cardIndex].answer,
  };
  
  cardSet.cards[cardIndex] = updatedCard;
  res.json(updatedCard);
};

// Delete a card from a set
export const deleteCard = (req: Request, res: Response) => {
  const { setId, cardId } = req.params;
  const cardSets = getCardSets();
  const cardSet = cardSets[setId];
  
  if (!cardSet) {
    return res.status(404).json({ error: 'Card set not found' });
  }
  
  const cardIndex = cardSet.cards.findIndex(c => c.id === cardId);
  if (cardIndex === -1) {
    return res.status(404).json({ error: 'Card not found' });
  }
  
  cardSet.cards.splice(cardIndex, 1);
  res.status(204).send();
};

// Get card count for a specific set
export const getCardCount = (req: Request, res: Response) => {
  const { setId } = req.params;
  const cardSets = getCardSets();
  const cardSet = cardSets[setId];
  
  if (!cardSet) {
    return res.status(404).json({ error: 'Card set not found' });
  }
  
  res.json({ count: cardSet.cards.length });
};
