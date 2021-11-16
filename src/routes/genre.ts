import { Router } from 'express';
import { body } from 'express-validator';

import isAdmin from '../middlewares/isAdmin';
import { getGenres, addGenre, getGenre, editGenre, deleteGenre, deleteGenresList } from '../controllers/genre';

const router = Router();

// POST /genres/delete
router.post('/delete-list', isAdmin, deleteGenresList);

// GET /genres
router.get('/', getGenres);

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

