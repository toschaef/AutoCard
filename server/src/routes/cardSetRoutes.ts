// src/routes/cardSetRoutes.ts

import { Router } from 'express';
import {
  createCardSet,
  getAllCardSets,
  getCardSetById,
  updateCardSet,
  deleteCardSet,
} from '../controllers/cardSetController';

const router = Router();

// Card Set CRUD operations
router.post('/', createCardSet);
router.get('/', getAllCardSets);
router.get('/:setId', getCardSetById);
router.put('/:setId', updateCardSet);
router.delete('/:setId', deleteCardSet);

export default router;