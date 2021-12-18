import { Router } from 'express';

import isAdmin from '../../middlewares/isAdmin';
import {
    getArtists,
    getArtistsNotDetailed,
    addArtist,
    editArtist,
    deleteArtist,
    deleteArtistsList,
    getArtist,
} from '../../controllers/admin/artist';
import { body } from "express-validator";
import { countries } from "countries-list";
import { middleware as paginateMiddleware } from 'express-paginate';

const router = Router();

// POST /artists/delete-list
router.post('/delete-list', isAdmin, deleteArtistsList);

// GET /artists
router.get('/',
    paginateMiddleware(20, 200),
    getArtists
);

// GET /artists/not-detailed
router.get('/not-detailed',
    getArtistsNotDetailed
);

// POST /artists/
router.post('/',
    isAdmin,
    body('name').trim().not().isEmpty(),
    body('country').isIn(Object.keys(countries)),
    body('genres').isArray(),
    addArtist
);

// GET /artists/:artistId
router.get('/:artistId',
    getArtist
);

// PUT /artists/:artistId
router.put('/:artistId', isAdmin, editArtist);

// DELETE /artists/:artistId
router.delete('/:artistId', isAdmin, deleteArtist);


export default router;
