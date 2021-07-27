import { Router } from 'express';

import isAdmin from '../middlewares/isAdmin';
import {getFestivals, addFestival, getFestival, editFestival, deleteFestival} from '../controllers/festival';

const router = Router();

// GET /artists
router.get('/', getFestivals);

// POST /artists
router.post('/', isAdmin, addFestival);

// GET /artists/:artistId
router.get('/:artistId', getFestival);

// PUT /artists/:artistId
router.put('/:artistId', isAdmin, editFestival);

// DELETE /artists/:artistId
router.delete('/:artistId', isAdmin, deleteFestival);

export default router;
