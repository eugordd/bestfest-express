import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Admin from '../../models/admin';

type RegisterRequest = {
    email: string,
    password: string,
    username: string
}

type LoginRequest = {
    email: string,
    password: string
}

export const adminRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, username } = req.body as RegisterRequest;
    try {
        const isExist = await Admin.findOne({ email });
        if (isExist) {
            const error: ResponseError = new Error('User already exists');
            error.code = 409;
            return next(error);
        }

        const hashedPw = await bcrypt.hash(password, 12);
        const admin = new Admin({
            email,
            username,
            password: hashedPw
        });
        await admin.save();
        res.status(201).json();
    } catch (e) {
        next(e);
        return e;
    }
}

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as LoginRequest;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            const error: ResponseError = new Error('Incorrect email or password');
            error.code = 401;
            next(error);
        }

        const isValid = await bcrypt.compare(password, admin.password);
        if (!isValid) {
            const error: ResponseError = new Error('Incorrect email or password');
            error.code = 401;
            next(error);
        }

        const adminSecret = 'yxglX5WFrPPJ75LY73AL';
        const token = jwt.sign({
            email: admin.email,
            name: admin.name,
            id: admin._id.toString()
        }, adminSecret, { expiresIn: '1d' });
        res.status(200).json({ token, admin });
    } catch (e) {
        next(e);
        return e;
    }
}
