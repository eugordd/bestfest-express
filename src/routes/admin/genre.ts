import { Router } from 'express';
import { body } from 'express-validator';

import isAdmin from '../../middlewares/isAdmin';
import { getGenres, getGenresNotDetailed, addGenre, getGenre, editGenre, deleteGenre, deleteGenresList } from '../../controllers/admin/genre';
import { middleware as paginateMiddleware } from "express-paginate";

const router = Router();

// POST /genres/delete
router.post('/delete-list', isAdmin, deleteGenresList);

// GET /genres
router.get('/',
    paginateMiddleware(20, 200),
    getGenres
);

// GET /artists/not-detailed
router.get('/not-detailed',
    getGenresNotDetailed
);

// POST /genres
router.post('/',
    isAdmin,
    body('name').trim().not().isEmpty(),
    addGenre
);

// GET /genres/:genreId
router.get('/:genreId', getGenre);

// PUT /genres/:genreId
router.put('/:genreId', isAdmin, editGenre);

// DELETE /genres/:genreId
router.delete('/:genreId', isAdmin, deleteGenre);

export default router;

