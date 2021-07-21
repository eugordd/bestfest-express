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
exports.findFestivals = void 0;
const festival_1 = __importDefault(require("../models/festival"));
const findFestivals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const artists = req.query.artists;
    const festivals = yield festival_1.default.find({ artists: { $in: artists } });
    const data = {
        festivals
    };
    return res.status(200).json(data);
});
exports.findFestivals = findFestivals;
