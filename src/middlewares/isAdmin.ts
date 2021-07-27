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
        throw new Error('Authorization header is not valid');
    }
    const token: string = authHeader?.split(' ')[1];
    const adminSecret = 'yxglX5WFrPPJ75LY73AL';
    try {
        const decodedToken = jwt.verify(token, adminSecret) as tokenObject;
        req.adminId = decodedToken.id;
    } catch (e) {
        next(e);
        return e;
    }

};
