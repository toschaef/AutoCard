// src/routes/cardSetRoutes.ts

import { Router } from 'express';
import {
  createCardSet,
  getAllCardSets,
  getCardSetById,
  updateCardSet,
  deleteCardSet,
} from '../controllers/cardSetController';
import cardRoutes from './cardRoutes'; // <-- Import card routes

const router = Router();

// Card Set CRUD operations
router.post('/', createCardSet);
router.get('/', getAllCardSets);
router.get('/:setId', getCardSetById);
router.put('/:setId', updateCardSet);
router.delete('/:setId', deleteCardSet);

// --- Nest the card routes ---
// Any request to /:setId/cards will be handled by the cardRoutes router
router.use('/:setId/cards', cardRoutes);

export default router;