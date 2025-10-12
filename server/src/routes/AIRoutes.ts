// src/routes/cardSetRoutes.ts

import { Router } from 'express';
import cardRoutes from './cardRoutes'; // <-- Import card routes
import multer from 'multer';
import { createBatchOfCards, createBatchOfCardsFromFile } from '../controllers/AIController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// POST /api/ai/
// Create a batch of cards using AI
router.post('/', createBatchOfCards);

// POST /api/ai/upload
// Create a batch of cards using AI from an uploaded file
router.post('/upload', upload.single('file'), createBatchOfCardsFromFile);

export default router;