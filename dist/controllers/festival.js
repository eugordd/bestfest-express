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
exports.deleteFestivalsList = exports.deleteFestival = exports.editFestival = exports.getFestival = exports.addFestival = exports.getFestivals = void 0;
const festival_1 = __importDefault(require("../models/festival"));
const genre_1 = __importDefault(require("../models/genre"));
const artist_1 = __importDefault(require("../models/artist"));
const formatValidationError_1 = __importDefault(require("../utils/formatValidationError"));
const express_validator_1 = require("express-validator");
const escapeRegExp_1 = __importDefault(require("../utils/escapeRegExp"));
const searchByCountry_1 = __importDefault(require("../utils/mongoose/searchByCountry"));
const getFestivals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
                },
            },
            {
                $lookup: {
                    from: artist_1.default.collection.name,
                    localField: 'artists',
                    foreignField: '_id',
                    as: 'artists'
                },
            },
            {
                $match: {
                    $or: [
                        { name: escapedSearchRegExp },
                        { description: escapedSearchRegExp },
                        { country: searchCountry },
                        { 'genres.name': escapedSearchRegExp },
                        { 'genres.symlinks': { $in: [escapedSearchRegExp] } },
                        { 'artists.name': escapedSearchRegExp }
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
        const total = yield festival_1.default.countDocuments();
        const festivals = yield festival_1.default.aggregate(aggregation);
        const data = {
            festivals,
            pagination: {
                page: req.query.page,
                limit: req.query.limit,
                total,
            }
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
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty())
            return next(formatValidationError_1.default(errors));
        const { name, description, country, place, dateStart, dateEnd, genres, artists } = req.body;
        const festival = new festival_1.default({
            name,
            description,
            country,
            place,
            dateStart,
            dateEnd,
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
        const festival = yield festival_1.default.findById(festivalId).populate('artists');
        const data = {
            festival
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
        const { name, description, country, place, dateStart, dateEnd, genres, artists } = req.body;
        const festival = yield festival_1.default.findById(festivalId);
        festival.name = name;
        festival.description = description;
        festival.country = country;
        festival.place = place;
        festival.dateStart = dateStart;
        festival.dateEnd = dateEnd;
        festival.genres = genres;
        festival.artists = artists;
        festival.save();
        const data = {
            festival
        };
        res.status(200).json(data);
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
        const data = {
            message: 'Deleted successfully'
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.deleteFestival = deleteFestival;
const deleteFestivalsList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        yield festival_1.default.deleteMany({ _id: { $in: ids } });
        const data = {
            message: 'Deleted successfully'
        };
        res.status(200).json(data);
    }
    catch (e) {
        next(e);
    }
});
exports.deleteFestivalsList = deleteFestivalsList;
exports.default = { getFestivals: exports.getFestivals, addFestival: exports.addFestival, getFestival: exports.getFestival, editFestival: exports.editFestival, deleteFestival: exports.deleteFestival, deleteFestivalsList: exports.deleteFestivalsList };
