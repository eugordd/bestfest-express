import { Request, Response, NextFunction } from "express";

export default (error: ResponseError, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const status = error.code || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data })
};
