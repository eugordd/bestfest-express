"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const artistSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    genres: [{
            type: String
        }]
});
exports.default = mongoose_1.model('Artist', artistSchema);
