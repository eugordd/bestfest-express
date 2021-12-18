import { Router } from 'express';

import isAdmin from '../../middlewares/isAdmin';
import { getFestivals, addFestival, getFestival, editFestival, deleteFestival, deleteFestivalsList } from '../../controllers/admin/festival';
import { body } from "express-validator";
import { middleware as paginateMiddleware } from "express-paginate";

const router = Router();

// POST /festivals/delete-list
router.post('/delete-list', isAdmin, deleteFestivalsList);

// GET /festivals
router.get('/',
    paginateMiddleware(20, 200),
    getFestivals
);

// POST /festivals
router.post('/',
    isAdmin,
    body('name').trim().not().isEmpty(),
    body('artists').isArray(),
    body('genres').isArray(),
    addFestival
);

// GET /festivals/:festivalId
router.get('/:festivalId', getFestival);

// PUT /festivals/:festivalId
router.put('/:festivalId', isAdmin, editFestival);

// DELETE /festivals/:festivalId
router.delete('/:festivalId', isAdmin, deleteFestival);

export default router;
