"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFestival = exports.editFestival = exports.getFestival = exports.addFestival = exports.getFestivals = void 0;
const festival_1 = __importDefault(require("../models/festival"));
const formatValidationError_1 = __importDefault(require("../utils/formatValidationError"));
const express_validator_1 = require("express-validator");
const getFestivals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const festivals = yield festival_1.default.find()
            .populate('genres')
            .populate('artists');
        const data = {
            festivals
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.getFestivals = getFestivals;
const addFestival = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return next((0, formatValidationError_1.default)(errors));
        const { name, description, country, genres, artists } = req.body;
        const festival = new festival_1.default({
            name,
            description,
            country,
            genres,
            artists
        });
        yield festival.save();
        const data = {
            festival: festival
        };
        return res.status(200).json(data);
    }
    catch (e) {
        return next(e);
    }
});
exports.addFestival = addFestival;
const getFestival = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { festivalId } = req.params;
        const festival = yield festival_1.default.findById(festivalId);
        const data = {
            festival: festival._doc
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.getFestival = getFestival;
const editFestival = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { festivalId } = req.params;
        const { name, description, genres, artists } = req.body;
        const festival = yield festival_1.default.findById(festivalId);
        festival.name = name;
        festival.description = description;
        festival.genres = genres;
        festival.artists = artists;
        festival.save();
        res.status(200);
    }
    catch (e) {
        next(e);
    }
});
exports.editFestival = editFestival;
const deleteFestival = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { festivalId } = req.params;
        yield festival_1.default.findByIdAndRemove(festivalId);
        res.status(200);
    }
    catch (e) {
        next(e);
    }
});
exports.deleteFestival = deleteFestival;
exports.default = { getFestivals: exports.getFestivals, addFestival: exports.addFestival, getFestival: exports.getFestival, editFestival: exports.editFestival, deleteFestival: exports.deleteFestival };
