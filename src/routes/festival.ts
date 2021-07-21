import { Router } from 'express';

import {getFestivals, addFestival, getFestival, editFestival, deleteFestival} from '../controllers/festival';

const router = Router();

// GET /artists
router.get('/', getFestivals);

// POST /artists
router.post('/', addFestival);

// GET /artists/:artistId
router.get('/:artistId', getFestival);

// PUT /artists/:artistId
router.put('/:artistId', editFestival);

// DELETE /artists/:artistId
router.delete('/:artistId', deleteFestival);

export default router;
