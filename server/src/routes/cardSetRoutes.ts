// src/routes/cardSetRoutes.ts

import { Router } from 'express';
import {
  createCardSet,
  getAllCardSets,
  getCardSetById,
  updateCardSet,
  deleteCardSet,
  getCardSetsByUserId,
} from '../controllers/cardSetController';
import cardRoutes from './cardRoutes'; // <-- Import card routes
import aiRoutes from './AIRoutes';
import verifyToken from '../middleware/authMiddleware';

const router = Router();

// Card Set CRUD operations

// POST /api/sets/
// create a new card set
router.post('/sets/', [verifyToken], createCardSet);

// GET /api/sets/
// get all card sets recently created (LIMIT 100)
router.get('/sets/', [verifyToken], getAllCardSets);

// GET /api/sets/user/
// get card sets by userID
router.get('/sets/user', [verifyToken], getCardSetsByUserId);

// GET /api/sets/:setId
// get card set by setID
router.get('/sets/:setId', [verifyToken], getCardSetById);

// PUT /api/sets/:setId
// update card set by setID
router.put('/sets/:setId', [verifyToken], updateCardSet);

// DELETE /api/sets/:setId
// delete card set by setID
router.delete('/sets/:setId', [verifyToken], deleteCardSet);

// --- Nest the card routes ---
// Any request to /api/cards/**  will be handled by the cardRoutes router
router.use('/cards', cardRoutes);

// Any request to /api/ai/** will be handled by the aiRoutes router
router.use('/ai', aiRoutes);

export default router;