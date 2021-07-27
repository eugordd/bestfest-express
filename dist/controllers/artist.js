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
exports.deleteArtist = exports.editArtist = exports.getArtist = exports.addArtist = exports.getArtists = void 0;
const artist_1 = __importDefault(require("../models/artist"));
const getArtists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = yield artist_1.default.find();
    const data = {
        artists
    };
    res.status(200).json(data);
});
exports.getArtists = getArtists;
const addArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, genres } = req.body;
    const artist = new artist_1.default({
        name,
        genres
    });
    yield artist.save();
    const data = {
        artist: artist._doc
    };
    res.status(200).json(data);
});
exports.addArtist = addArtist;
const getArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { artistId } = req.params;
    const artist = yield artist_1.default.findById(artistId);
    const data = {
        artist
    };
    res.status(200).json(data);
});
exports.getArtist = getArtist;
const editArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { artistId } = req.params;
    const { name, genres } = req.body;
    const artist = yield artist_1.default.findById(artistId);
    artist.name = name;
    artist.genres = genres;
    yield artist.save();
    const data = {
        artist: artist._doc
    };
    res.status(200).json(data);
});
exports.editArtist = editArtist;
const deleteArtist = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { artistId } = req.params;
    yield artist_1.default.findByIdAndRemove(artistId);
    res.status(200);
});
exports.deleteArtist = deleteArtist;
exports.default = { getArtists: exports.getArtists, getArtist: exports.getArtist, addArtist: exports.addArtist, editArtist: exports.editArtist, deleteArtist: exports.deleteArtist };
