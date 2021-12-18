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
exports.deleteArtistsList = exports.deleteArtist = exports.editArtist = exports.getArtist = exports.addArtist = exports.getArtistsNotDetailed = exports.getArtists = void 0;
const artist_1 = __importDefault(require("../models/artist"));
const genre_1 = __importDefault(require("../models/genre"));
const express_validator_1 = require("express-validator");
const formatValidationError_1 = __importDefault(require("../utils/formatValidationError"));
const searchByCountry_1 = __importDefault(require("../utils/mongoose/searchByCountry"));
const escapeRegExp_1 = __importDefault(require("../utils/escapeRegExp"));
const getArtists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // noinspection DuplicatedCode
        let search = req.query.search;
        if (!search)
            search = '';
        search = search.trim().toLowerCase();
        const escapedSearchRegExp = new RegExp(escapeRegExp_1.default(search), 'i');
        const searchCountry = {
            $in: searchByCountry_1.default(search)
        };
        const aggregation = [
            {
                $lookup: {
                    from: genre_1.default.collection.name,
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genres'
                }
            },
            {
                $match: {
                    $or: [
                        { name: escapedSearchRegExp },
                        { description: escapedSearchRegExp },
                        { country: searchCountry },
                        { 'genres.name': escapedSearchRegExp },
                        { 'genres.symlinks': { $in: [escapedSearchRegExp] } }
                    ]
                }
            },
            {
                $skip: req.skip
            },
            {
                $limit: req.query.limit
            }
        ];
        const total = yield artist_1.default.countDocuments();
        const artists = yield artist_1.default.aggregate(aggregation);
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
const getArtistsNotDetailed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield artist_1.default.find().select('name').lean();
        const data = {
            artists
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.getArtistsNotDetailed = getArtistsNotDetailed;
const addArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return next(formatValidationError_1.default(errors));
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
            artist
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
exports.default = { getArtists: exports.getArtists, getArtistsNotDetailed: exports.getArtistsNotDetailed, getArtist: exports.getArtist, addArtist: exports.addArtist, editArtist: exports.editArtist, deleteArtist: exports.deleteArtist, deleteArtistsList: exports.deleteArtistsList };
