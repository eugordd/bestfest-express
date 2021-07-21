import { Router } from 'express';

import { getArtists, addArtist, editArtist, deleteArtist, getArtist } from '../controllers/artist';

const router = Router();

// GET /artists
router.get('/', getArtists);

// POST /artists/
router.post('/', addArtist);

// GET /artists/:artistId
router.get('/:artistId', getArtist);

// PUT /artists/:artistId
router.post('/', editArtist);

// DELETE /artists/:artistId
router.delete('/', deleteArtist);


export default router;
