// src/routes/cardSetRoutes.ts

import { Router } from 'express';
import {
  createCardSet,
  getAllCardSets,
  getCardSetById,
  addCardToSet,
  updateCard,
  deleteCard,
} from '../controllers/cardSetController';

const router = Router();

router.post('/', createCardSet);
router.get('/', getAllCardSets);
router.get('/:setId', getCardSetById);
router.post('/:setId/cards', addCardToSet);
router.put('/:setId/cards/:cardId', updateCard);
router.delete('/:setId/cards/:cardId', deleteCard);

export default router;