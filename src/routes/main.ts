import { Router } from 'express';

import { findFestivals, getArtists } from '../controllers/main';


const router = Router();

// GET /artists
router.get('/artists', getArtists);

// GET /find-festivals
router.post('/find-festivals', findFestivals);

export default router;
