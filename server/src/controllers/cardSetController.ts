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
export const getAllCardSets = async (req: Request, res: Response) => {
  try {
    const sets = await CardSet.find({}).limit(100).sort({ created: -1 }); // Limit to 100 most recent sets
    res.json(sets);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Get a single card set
export const getCardSetById = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params;
    const cardSet = await CardSet.find({ user_id });
    if (!cardSet) {
      return res.status(404).json({ message: 'Card set not found' });
    }
    res.json(cardSet);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Update a card set
export const updateCardSet = async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;
    const updateData = req.body;
    const updatedSet = await CardSet.findByIdAndUpdate(
      setId,
      updateData,
      { new: true, runValidators: true },
    );
    res.status(200).json(updatedSet);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Delete a card set
export const deleteCardSet = async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;
    const deletedSet = await CardSet.findByIdAndDelete(setId);
    if (!deletedSet) {
      return res.status(404).json({ message: 'Card set not found' });
    }
    res.status(204).send();
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
