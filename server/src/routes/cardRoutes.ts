// src/routes/cardRoutes.ts

import { Router } from 'express';
import {
  getCardsBySetId,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
  getCardCount,
} from '../controllers/cardController';

const router = Router();

// Get all cards from a specific set
router.get('/sets/:setId', getCardsBySetId);

// Get card count for a specific set
router.get('/sets/:setId/count', getCardCount);

// Get a single card by ID from a specific set
router.get('/sets/:setId/cards/:cardId', getCardById);

// Create a new card in a specific set
router.post('/sets/:setId', createCard);

// Update an existing card
router.put('/sets/:setId/cards/:cardId', updateCard);

// Delete a card from a set
router.delete('/sets/:setId/cards/:cardId', deleteCard);

export default router;