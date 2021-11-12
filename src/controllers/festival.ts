import { NextFunction, Request, Response } from "express";

import Festival from '../models/festival';

type FestivalRequestParams = {
    festivalId: string
}

type FestivalRequestBody = {
    name: string,
    description: string,
    genres: string[],
    artists: string[]
}

export const getFestivals = async (req: Request, res: Response, next: NextFunction) => {
    const festivals: Array<Object> = await Festival.find();
    const data = {
        festivals
    };

    res.status(200).json(data);
};

export const addFestival = async (req: Request, res: Response, next: NextFunction) => {
    const festival = new Festival({
        name: 'Test festival',
        description: 'Description of test festival',
        genres: ['Rock', 'Pop']
    });

    console.log('before festival.save()');
    await festival.save()

    const data = {
        festival: festival
    }
    return res.status(200).json(data);
};

export const getFestival = async (req: Request, res: Response, next: NextFunction) => {
    const { festivalId } = req.params as FestivalRequestParams;
    const festival = await Festival.findById(festivalId);
    const data = {
        festival: festival._doc
    }
    res.status(200).json(data);
};

export const editFestival = async (req: Request, res: Response, next: NextFunction) => {
    const { festivalId } = req.params as FestivalRequestParams;
    const { name, description, genres, artists } = req.body as FestivalRequestBody

    const festival = await Festival.findById(festivalId);
    festival.name = name;
    festival.description = description;
    festival.genres = genres;
    festival.artists = artists;
    festival.save();
    res.status(200)
};

export const deleteFestival = async(req: Request, res: Response, next: NextFunction) => {
    const { festivalId } = req.params as FestivalRequestParams;
    await Festival.findByIdAndRemove(festivalId);
    res.status(200);
}

export default { getFestivals, addFestival, getFestival, editFestival, deleteFestival };
