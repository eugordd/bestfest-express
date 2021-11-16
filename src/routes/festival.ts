import { Router } from 'express';

import isAdmin from '../middlewares/isAdmin';
import {getFestivals, addFestival, getFestival, editFestival, deleteFestival} from '../controllers/festival';
import {body} from "express-validator";

const router = Router();

// GET /artists
router.get('/', getFestivals);

// POST /artists
router.post('/',
    isAdmin,
    body('name').trim().not().isEmpty(),
    body('artists').isArray(),
    body('genres').isArray(),
    addFestival
);

// GET /artists/:artistId
router.get('/:artistId', getFestival);

// PUT /artists/:artistId
router.put('/:artistId', isAdmin, editFestival);

// DELETE /artists/:artistId
router.delete('/:artistId', isAdmin, deleteFestival);

export default router;
