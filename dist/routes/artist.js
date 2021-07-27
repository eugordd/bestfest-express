"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const artist_1 = require("../controllers/artist");
const router = express_1.Router();
// GET /artists
router.get('/', artist_1.getArtists);
// POST /artists/
router.post('/', isAdmin_1.default, artist_1.addArtist);
// GET /artists/:artistId
router.get('/:artistId', artist_1.getArtist);
// PUT /artists/:artistId
router.post('/', isAdmin_1.default, artist_1.editArtist);
// DELETE /artists/:artistId
router.delete('/', isAdmin_1.default, artist_1.deleteArtist);
exports.default = router;
