"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const festival_1 = require("../controllers/festival");
const router = express_1.Router();
// GET /artists
router.get('/', festival_1.getFestivals);
router.post('/', festival_1.addFestival);
exports.default = router;
