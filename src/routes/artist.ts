import { Router } from 'express';

import isAdmin from '../middlewares/isAdmin';
import { getArtists, addArtist, editArtist, deleteArtist, getArtist } from '../controllers/artist';

const router = Router();

// GET /artists
router.get('/', getArtists);

// POST /artists/
router.post('/', isAdmin, addArtist);

// GET /artists/:artistId
router.get('/:artistId', getArtist);

// PUT /artists/:artistId
router.post('/', isAdmin, editArtist);

// DELETE /artists/:artistId
router.delete('/', isAdmin, deleteArtist);


export default router;
