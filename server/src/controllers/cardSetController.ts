// src/controllers/cardSetController.ts

import { Request, Response } from 'express';
import CardSet from '../types/Set';


// Create a new card set
export const createCardSet = (req: Request, res: Response) => {
  try {
  const {
    user_id,
    title,
    description,
    cards
  } = req.body;
  // create a new set 
  CardSet.create({
    user_id,
    title,
    description,
    cards
  });
  res.status(201).json({ message: 'Set created successfully' });
} catch (error: any) {
  console.error(error.message);
  res.status(500).json({ message: 'Server Error' });
}
}

// Get all card sets
export const getAllCardSets = (req: Request, res: Response) => {
  try {
    const sets = CardSet.find().limit(100).sort({ created: -1 }); // Limit to 100 most recent sets
    res.json(sets);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Get a single card set
// export const getCardSetById = (req: Request, res: Response) => {
//   const { setId } = req.params;
//   const cardSet = cardSets[setId];
//   if (!cardSet) {
//     return res.status(404).send('Card set not found.');
//   }
//   res.json(cardSet);
// };

// // Update a card set
// export const updateCardSet = (req: Request, res: Response) => {
//   const { setId } = req.params;
//   const cardSet = cardSets[setId];
//   if (!cardSet) {
//     return res.status(404).json({ error: 'Card set not found' });
//   }
  
//   const updatedSet = {
//     ...cardSet,
//     title: req.body.title || cardSet.title,
//     topic: req.body.topic || cardSet.topic,
//   };
  
//   cardSets[setId] = updatedSet;
//   res.json(updatedSet);
// };

// // Delete a card set
// export const deleteCardSet = (req: Request, res: Response) => {
//   const { setId } = req.params;
//   const cardSet = cardSets[setId];
//   if (!cardSet) {
//     return res.status(404).json({ error: 'Card set not found' });
//   }
  
//   delete cardSets[setId];
//   res.status(204).send();
// };

// export const getCardSets = () => cardSets;