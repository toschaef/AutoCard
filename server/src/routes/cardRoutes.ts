// src/routes/cardRoutes.ts

import { Router } from 'express';
import {
  getCardsBySetId,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
} from '../controllers/cardController';
import verifyToken from '../middleware/authMiddleware';

// This router needs to merge params from the parent router to access ':setId'
const router = Router({ mergeParams: true });

// GET /api/cards/:setId/cards/
// get all cards from the set ID
router.get('/:setId/cards', [verifyToken], getCardsBySetId);

// POST /api/cards/
// create a new card
router.post('/', [verifyToken], createCard);

// GET /api/cards/:cardId
// get card by ID
router.get('/:cardId', [verifyToken], getCardById);

// PUT /api/cards/:setId/cards/:cardId
// update card by ID from the set ID
router.put('/:cardId', [verifyToken], updateCard);

// DELETE /api/cards/:setId/cards/:cardId
// delete card by ID from the set ID
router.delete('/:cardId', [verifyToken], deleteCard); 

export default router;