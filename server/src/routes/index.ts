// src/routes/index.ts

import { Router } from 'express';
import cardSetRoutes from './cardSetRoutes';
import cardRoutes from './cardRoutes';

const router = Router();

// Mount route modules
router.use('/sets', cardSetRoutes);
router.use('/cards', cardRoutes);

export { router };
