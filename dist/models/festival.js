"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const festivalSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    genres: [{
            type: String
        }],
    artists: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Artist'
        }]
});
exports.default = mongoose_1.model('Festival', festivalSchema);
