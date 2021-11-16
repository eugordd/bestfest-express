"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const countries_list_1 = require("countries-list");
const artistSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    country: {
        type: String,
        required: true,
        enum: Object.keys(countries_list_1.countries)
    },
    genres: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Genre'
        }],
});
exports.default = (0, mongoose_1.model)('Artist', artistSchema);
