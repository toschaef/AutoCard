// src/controllers/cardSetController.ts

import { Request, Response } from 'express';
import CardSet from '../types/Set';


// Create a new card set
export const createCardSet = (req: Request, res: Response) => {
  try {
  const { userId, title, description, cards } = req.body;
  // create a new set
  CardSet.create({ user_id: userId, title, description, cards });
  res.status(201).json({ message: 'Set created successfully' });
} catch (error: any) {
  console.error(error.message);
  res.status(500).json({ message: 'Server Error' });
}
}

// Get all card sets
export const getAllCardSets = async (req: Request, res: Response) => {
  try {
    // Retrieve recent card sets with a limit of 100 sets
    const sets = await CardSet.find({}).limit(100).sort({ created: -1 }); // Limit to 100 most recent sets
    res.json(sets);

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get card sets by user ID
export const getCardSetsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    // Retrieve recent card sets for the specified user ID with a limit of 100 sets
    const sets = await CardSet.find({ user_id: userId }).limit(100).sort({ created: -1 }); // Limit to 100 most recent sets
    res.json(sets);

  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// // Get a single card set
export const getCardSetById = async (req: Request, res: Response) => {
  try {
    const { setId } = req.params;
    const cardSet = await CardSet.findById(setId);
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
    const { userId } = req.body;

    // Verify the card set exists
    const cardSet = await CardSet.findById(setId);
    if (!cardSet) {
      return res.status(404).json({ message: 'Card set not found' });
    }

    // Verify the user is the owner of the card set
    if (cardSet.user_id.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to update this card set' });
    }

    // Update the card set
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
    const { userId } = req.body;

    // Verify the card set exists
    const cardSet = await CardSet.findById(setId);
    if (!cardSet) {
      return res.status(404).json({ message: 'Card set not found' });
    }

    // Verify the user is the owner of the card set
    if (cardSet.user_id.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this card set' });
    }

    // Delete the card set
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
