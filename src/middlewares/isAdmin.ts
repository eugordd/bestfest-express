import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

type tokenObject = {
    id: string,
    email: string,
    name: string
};

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    if (!authHeader || !authHeader?.split(' ')[1]) {
        const error : ResponseError = new Error('Authorization header is not valid');
        error.code = 401;
        throw error;
    }
    const token: string = authHeader?.split(' ')[1];
    const adminSecret = 'yxglX5WFrPPJ75LY73AL';
    try {
        const decodedToken = jwt.verify(token, adminSecret) as tokenObject;
        req.adminId = decodedToken.id;
        return next();
    } catch (e) {
        const error : ResponseError = new Error('Authorization header is not valid');
        error.code = 401;
        throw error;
    }
};
