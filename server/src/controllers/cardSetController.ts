// src/controllers/cardSetController.ts

import { Request, Response } from 'express';
import { CardSet, Card } from '../../../types';


// Create a new card set
export const createCardSet = (req: Request, res: Response) => {
  const {
    user_id,
    title,
    topic,
    description,
    level,
    context
  } = req.params;

  const newSetId = `set-${Date.now()}`;
  const date = new Date();

  const cardSets = CardSetManager.getCardSets();

  const newSet: CardSet = {
    id: newSetId,
    title: title || 'Untitled Set',
    topic: topic || 'Untitled Topic',
    cards: [],
    created: date,
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

// Update a card set
export const updateCardSet = (req: Request, res: Response) => {
  const { setId } = req.params;
  const cardSet = cardSets[setId];
  if (!cardSet) {
    return res.status(404).json({ error: 'Card set not found' });
  }
  
  const updatedSet = {
    ...cardSet,
    title: req.body.title || cardSet.title,
    topic: req.body.topic || cardSet.topic,
  };
  
  cardSets[setId] = updatedSet;
  res.json(updatedSet);
};

// Delete a card set
export const deleteCardSet = (req: Request, res: Response) => {
  const { setId } = req.params;
  const cardSet = cardSets[setId];
  if (!cardSet) {
    return res.status(404).json({ error: 'Card set not found' });
  }
  
  delete cardSets[setId];
  res.status(204).send();
};

export const getCardSets = () => cardSets;