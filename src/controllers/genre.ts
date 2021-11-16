import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import Genre from '../models/genre';
import formatValidationError from "../utils/formatValidationError";


type GenreRequestBody = {
    name: string,
    symlinks: Array<string>
}

type GenresListRequestBody = {
    ids: Array<string>
}

type GenreRequestParams = {
    genreId: string
}

type Genre = {
    name: string,
    symlinks: Array<string>
}

export const getGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (e) {
        next(e)
    }
    const genres: Array<Genre> = await Genre.find();
    const data = { genres };

    res.status(200).json(data);
};

export const addGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return next(formatValidationError(errors));

        const { name, symlinks } = req.body as GenreRequestBody;

        const genre = new Genre({ name, symlinks });
        await genre.save();
        const data = {
            genre: genre
        }

        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
};

export const getGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { genreId } = req.params as GenreRequestParams;
        const genre = await Genre.findById(genreId);

        const data = {
            genre: genre
        };
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const editGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { genreId } = req.params as GenreRequestParams;
        const { name, symlinks } = req.body as GenreRequestBody;

        const genre = await Genre.findById(genreId);
        genre.name = name;
        genre.symlinks = symlinks;
        genre.save();

        const data = {
            genre: genre
        };

        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { genreId } = req.params as GenreRequestParams;
        await Genre.findByIdAndDelete(genreId);

        const data = {
            message: 'Deleted successfully'
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const deleteGenresList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ids } = req.body as GenresListRequestBody;
        await Genre.deleteMany({ _id: { $in: ids } });

        const data = {
            message: 'Deleted successfully'
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

