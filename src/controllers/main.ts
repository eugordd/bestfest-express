import { NextFunction, Request, Response } from "express";

import Festival from '../models/festival';

export const findFestivals = async (req: Request, res: Response, next: NextFunction) => {
    const artists = req.query.artists;
    const festivals: Array<Object> = await Festival.find({ artists: { $in: artists } });
    const data = {
        festivals
    };
    return res.status(200).json(data);
}
