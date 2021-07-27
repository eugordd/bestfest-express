"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader || !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1])) {
        throw new Error('Authorization header is not valid');
    }
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    const adminSecret = 'yxglX5WFrPPJ75LY73AL';
    const decodedToken = jsonwebtoken_1.default.verify(token, adminSecret);
    req.adminId = 'test';
};
