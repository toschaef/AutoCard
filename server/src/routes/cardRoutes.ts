// src/routes/cardRoutes.ts

import { Router } from 'express';
import {
  getCardsBySetId,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
} from '../controllers/cardController';

// This router needs to merge params from the parent router to access ':setId'
const router = Router({ mergeParams: true });

// GET /api/cards/:setId/cards/
// get all cards from the set ID
router.get('/:setId/cards', getCardsBySetId);


// // POST /api/cards/
// // create a new card in the set ID
router.post('/', createCard);

// // GET /api/cards/:cardId
// // get card by ID from the set ID
router.get('/:cardId', getCardById);

// // PUT /api/cards/:setId/cards/:cardId
// // update card by ID from the set ID
router.put('/:cardId', updateCard);

// // DELETE /api/cards/:setId/cards/:cardId
// // delete card by ID from the set ID
router.delete('/:cardId', deleteCard);

export default router;