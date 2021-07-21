"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const artist_1 = require("../controllers/artist");
const router = express_1.Router();
// GET /artists
router.get('/', artist_1.getArtists);
// POST /artists
router.post('/', artist_1.addArtist);
exports.default = router;
