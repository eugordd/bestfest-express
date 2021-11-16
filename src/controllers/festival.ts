import { NextFunction, Request, Response } from "express";

import Festival from '../models/festival';
import formatValidationError from "../utils/formatValidationError";
import {validationResult} from "express-validator";

type FestivalRequestParams = {
    festivalId: string
}

type FestivalRequestBody = {
    name: string,
    description: string,
    country: string,
    genres: string[],
    artists: string[]
}

export const getFestivals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const festivals: Array<Object> = await Festival.find()
            .populate('genres')
            .populate('artists');
        const data = {
            festivals
        };

        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const addFestival = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return next(formatValidationError(errors));

        const { name, description, country, genres, artists } = req.body as FestivalRequestBody;
        const festival = new Festival({
            name,
            description,
            country,
            genres,
            artists
        });
        await festival.save();

        const data = {
            festival: festival
        };
        return res.status(200).json(data);
    } catch (e) {
        return next(e);
    }

};

export const getFestival = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { festivalId } = req.params as FestivalRequestParams;
        const festival = await Festival.findById(festivalId);
        const data = {
            festival: festival._doc
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const editFestival = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { festivalId } = req.params as FestivalRequestParams;
        const { name, description, genres, artists } = req.body as FestivalRequestBody

        const festival = await Festival.findById(festivalId);
        festival.name = name;
        festival.description = description;
        festival.genres = genres;
        festival.artists = artists;
        festival.save();
        res.status(200)
    } catch (e) {
        next(e)
    }
};

export const deleteFestival = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { festivalId } = req.params as FestivalRequestParams;
        await Festival.findByIdAndRemove(festivalId);
        res.status(200);
    } catch (e) {
        next(e)
    }
}

export default { getFestivals, addFestival, getFestival, editFestival, deleteFestival };
