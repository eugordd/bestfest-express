"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const festival_1 = require("../controllers/festival");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
// GET /artists
router.get('/', festival_1.getFestivals);
// POST /artists
router.post('/', isAdmin_1.default, (0, express_validator_1.body)('name').trim().not().isEmpty(), (0, express_validator_1.body)('artists').isArray(), (0, express_validator_1.body)('genres').isArray(), festival_1.addFestival);
// GET /artists/:artistId
router.get('/:artistId', festival_1.getFestival);
// PUT /artists/:artistId
router.put('/:artistId', isAdmin_1.default, festival_1.editFestival);
// DELETE /artists/:artistId
router.delete('/:artistId', isAdmin_1.default, festival_1.deleteFestival);
exports.default = router;
