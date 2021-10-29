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
exports.adminLogin = exports.adminRegister = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = __importDefault(require("../models/admin"));
const adminRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name } = req.body;
    try {
        const isExist = yield admin_1.default.findOne({ email });
        if (isExist) {
            const error = new Error('User already exists');
            error.code = 409;
            return next(error);
        }
        const hashedPw = yield bcryptjs_1.default.hash(password, 12);
        const admin = new admin_1.default({
            email,
            name,
            password: hashedPw
        });
        yield admin.save();
        res.status(201).json();
    }
    catch (e) {
        next(e);
        return e;
    }
});
exports.adminRegister = adminRegister;
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield admin_1.default.findOne({ email });
        if (!admin) {
            const error = new Error('Incorrect email or password');
            error.code = 401;
            next(error);
        }
        const isValid = yield bcryptjs_1.default.compare(password, admin.password);
        if (!isValid) {
            const error = new Error('Incorrect email or password');
            error.code = 401;
            next(error);
        }
        const adminSecret = 'yxglX5WFrPPJ75LY73AL';
        const token = jsonwebtoken_1.default.sign({
            email: admin.email,
            name: admin.name,
            id: admin._id.toString()
        }, adminSecret, { expiresIn: '1d' });
        res.status(200).json({ token, admin });
    }
    catch (e) {
        next(e);
        return e;
    }
});
exports.adminLogin = adminLogin;
