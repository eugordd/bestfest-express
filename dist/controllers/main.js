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
exports.getArtists = exports.findFestivals = void 0;
const mongodb_1 = require("mongodb");
const festival_1 = __importDefault(require("../models/festival"));
const artist_1 = __importDefault(require("../models/artist"));
const countries_list_1 = require("countries-list");
const findFestivals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString();
    const yearEnd = new Date(new Date().getFullYear(), 12, 31).toISOString();
    const continents = req.body.continents || [];
    const dateStart = req.body.dateStart || yearStart;
    const dateEnd = req.body.dateEnd || yearEnd;
    const artists = req.body.artists || [];
    const countriesInContinents = Object.entries(countries_list_1.countries)
        .filter(country => continents.includes(country[1].continent))
        .map(country => country[0]);
    const aggregation = [
        {
            $match: {
                $and: [
                    { artists: { $in: artists.map(artist => new mongodb_1.ObjectId(artist._id)) } },
                    { country: { $in: countriesInContinents } },
                    { dateStart: { $gte: new Date(dateStart) } },
                    { dateEnd: { $lte: new Date(dateEnd) } }
                ]
            }
        },
        {
            $lookup: {
                from: artist_1.default.collection.name,
                localField: 'artists',
                foreignField: '_id',
                as: 'artists'
            }
        }
    ];
    const festivals = yield festival_1.default.aggregate(aggregation);
    const formattedFestivals = festivals.map(festival => {
        let festivalPriority = 0, matchedArtists = [];
        festival.artists.forEach((festivalArtist) => {
            artists.forEach(searchingArtist => {
                if (festivalArtist._id.toString() === searchingArtist._id) {
                    festivalPriority += searchingArtist.priority;
                    matchedArtists.push(festivalArtist);
                }
            });
        });
        return Object.assign(Object.assign({}, festival), { priority: festivalPriority, matchedArtists });
    });
    const data = {
        festivals: formattedFestivals.sort((a, b) => b.priority - a.priority)
    };
    return res.status(200).json(data);
});
exports.findFestivals = findFestivals;
const getArtists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let search = req.query.search;
    if (!search)
        search = '';
    search = search.trim().toLowerCase();
    const artists = yield artist_1.default.find({ name: new RegExp(search, 'i') });
    const data = {
        artists
    };
    return res.status(200).json(data);
});
exports.getArtists = getArtists;
