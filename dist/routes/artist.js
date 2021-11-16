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
const router = (0, express_1.Router)();
// POST /artists/delete-list
router.post('/delete-list', isAdmin_1.default, artist_1.deleteArtistsList);
// GET /artists
router.get('/', (0, express_paginate_1.middleware)(10, 200), artist_1.getArtists);
// POST /artists/
router.post('/', isAdmin_1.default, (0, express_validator_1.body)('name').trim().not().isEmpty(), (0, express_validator_1.body)('country').isIn(Object.keys(countries_list_1.countries)), (0, express_validator_1.body)('genres').isArray(), artist_1.addArtist);
// GET /artists/:artistId
router.get('/:artistId', artist_1.getArtist);
// PUT /artists/:artistId
router.put('/:artistId', isAdmin_1.default, artist_1.editArtist);
// DELETE /artists/:artistId
router.delete('/:artistId', isAdmin_1.default, artist_1.deleteArtist);
exports.default = router;
