"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const festival_1 = require("../controllers/festival");
const express_validator_1 = require("express-validator");
const express_paginate_1 = require("express-paginate");
const router = express_1.Router();
// POST /festivals/delete-list
router.post('/delete-list', isAdmin_1.default, festival_1.deleteFestivalsList);
// GET /festivals
router.get('/', express_paginate_1.middleware(20, 200), festival_1.getFestivals);
// POST /festivals
router.post('/', isAdmin_1.default, express_validator_1.body('name').trim().not().isEmpty(), express_validator_1.body('artists').isArray(), express_validator_1.body('genres').isArray(), festival_1.addFestival);
// GET /festivals/:festivalId
router.get('/:festivalId', festival_1.getFestival);
// PUT /festivals/:festivalId
router.put('/:festivalId', isAdmin_1.default, festival_1.editFestival);
// DELETE /festivals/:festivalId
router.delete('/:festivalId', isAdmin_1.default, festival_1.deleteFestival);
exports.default = router;
