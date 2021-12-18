"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../controllers/main");
const router = express_1.Router();
// GET /artists
router.get('/artists', main_1.getArtists);
// GET /find-festivals
router.post('/find-festivals', main_1.findFestivals);
exports.default = router;
