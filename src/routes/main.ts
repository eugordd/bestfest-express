import { Router } from 'express';

import { findFestivals } from '../controllers/main';

const router = Router();

// GET /artists
router.get('/find-festivals', findFestivals);

export default router;
