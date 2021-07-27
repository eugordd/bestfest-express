"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    festivals: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Festival'
        }
    ]
});
exports.default = mongoose_1.model('Admin', adminSchema);
