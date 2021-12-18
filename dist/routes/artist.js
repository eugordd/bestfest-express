"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const artist_1 = require("../controllers/artist");
const express_validator_1 = require("express-validator");
const countries_list_1 = require("countries-list");
const express_paginate_1 = require("express-paginate");
const router = express_1.Router();
// POST /artists/delete-list
router.post('/delete-list', isAdmin_1.default, artist_1.deleteArtistsList);
// GET /artists
router.get('/', express_paginate_1.middleware(20, 200), artist_1.getArtists);
// GET /artists/not-detailed
router.get('/not-detailed', artist_1.getArtistsNotDetailed);
// POST /artists/
router.post('/', isAdmin_1.default, express_validator_1.body('name').trim().not().isEmpty(), express_validator_1.body('country').isIn(Object.keys(countries_list_1.countries)), express_validator_1.body('genres').isArray(), artist_1.addArtist);
// GET /artists/:artistId
router.get('/:artistId', artist_1.getArtist);
// PUT /artists/:artistId
router.put('/:artistId', isAdmin_1.default, artist_1.editArtist);
// DELETE /artists/:artistId
router.delete('/:artistId', isAdmin_1.default, artist_1.deleteArtist);
exports.default = router;
