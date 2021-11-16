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
exports.deleteArtistsList = exports.deleteArtist = exports.editArtist = exports.getArtist = exports.addArtist = exports.getArtists = void 0;
const artist_1 = __importDefault(require("../models/artist"));
const express_validator_1 = require("express-validator");
const formatValidationError_1 = __importDefault(require("../utils/formatValidationError"));
const getArtists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield artist_1.default.countDocuments();
        const artists = yield artist_1.default.find()
            .limit(req.query.limit)
            .skip(req.skip)
            .populate('genres')
            .lean();
        const data = {
            artists,
            pagination: {
                page: req.query.page,
                limit: req.query.limit,
                total
            }
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.getArtists = getArtists;
const addArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return next((0, formatValidationError_1.default)(errors));
        const { name, description, country, genres } = req.body;
        const artist = new artist_1.default({
            name,
            description,
            country,
            genres
        });
        yield artist.save();
        const data = {
            artist: artist
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.addArtist = addArtist;
const getArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { artistId } = req.params;
        const artist = yield artist_1.default.findById(artistId);
        const data = {
            artist
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.getArtist = getArtist;
const editArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { artistId } = req.params;
        const { name, description, country, genres } = req.body;
        const artist = yield artist_1.default.findById(artistId);
        artist.name = name;
        artist.description = description;
        artist.country = country;
        artist.genres = genres;
        yield artist.save();
        const data = {
            artist: artist._doc
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.editArtist = editArtist;
const deleteArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { artistId } = req.params;
        yield artist_1.default.findByIdAndRemove(artistId);
        const data = {
            message: 'Deleted successfully'
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.deleteArtist = deleteArtist;
const deleteArtistsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        yield artist_1.default.deleteMany({ _id: { $in: ids } });
        const data = {
            message: 'Deleted successfully'
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.deleteArtistsList = deleteArtistsList;
exports.default = { getArtists: exports.getArtists, getArtist: exports.getArtist, addArtist: exports.addArtist, editArtist: exports.editArtist, deleteArtist: exports.deleteArtist, deleteArtistsList: exports.deleteArtistsList };
