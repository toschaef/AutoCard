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

// POST /api/sets/
// create a new card set
router.post('/sets/', createCardSet);

// GET /api/sets/
// get all card sets recently created (LIMIT 100)
router.get('/sets/', getAllCardSets);

// // GET /api/sets/:setId
// // get card set by ID
router.get('/sets/:setId', getCardSetById);

// // PUT /api/sets/:setId
// // update card set by ID
router.put('/sets/:setId', updateCardSet);

// // DELETE /api/sets/:setId
// // delete card set by ID
router.delete('/sets/:setId', deleteCardSet);

// --- Nest the card routes ---
// Any request to /api/cards/**  will be handled by the cardRoutes router
router.use('/cards', cardRoutes);

export default router;