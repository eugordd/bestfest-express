"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (error, req, res, next) => {
    console.log(error);
    const status = error.code || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
};
