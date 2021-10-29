"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const artistSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    genres: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Genre'
        }],
});
exports.default = (0, mongoose_1.model)('Artist', artistSchema);
