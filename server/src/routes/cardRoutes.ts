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

// This router needs to merge params from the parent router to access ':setId'
const router = Router({ mergeParams: true });

// GET /api/sets/:setId/cards/
router.get('/', getCardsBySetId);

// GET /api/sets/:setId/cards/count
router.get('/count', getCardCount);

// POST /api/sets/:setId/cards/
router.post('/', createCard);

// GET /api/sets/:setId/cards/:cardId
router.get('/:cardId', getCardById);

// PUT /api/sets/:setId/cards/:cardId
router.put('/:cardId', updateCard);

// DELETE /api/sets/:setId/cards/:cardId
router.delete('/:cardId', deleteCard);

export default router;