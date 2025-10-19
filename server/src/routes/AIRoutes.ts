// src/routes/cardSetRoutes.ts

import { Router } from 'express';
import cardRoutes from './cardRoutes'; // <-- Import card routes
import multer from 'multer';
import { createBatchOfCards, createBatchOfCardsFromFile } from '../controllers/AIController';
import verifyToken from '../middleware/authMiddleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/ai/
// Create a batch of cards using AI
router.post('/', [verifyToken], createBatchOfCards);

// POST /api/ai/upload
// Create a batch of cards using AI from an uploaded file
router.post('/upload', [verifyToken, upload.single('file')], createBatchOfCardsFromFile);

export default router;