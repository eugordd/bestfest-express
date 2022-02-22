import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

import Genre, { IGenre } from '../../models/genre';
import formatValidationError from "../../utils/formatValidationError";
import escapeStringRegexp from "../../utils/escapeRegExp";


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

export const getGenres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let search = req.query.search as string;
        if (!search) search = '';
        search = search.trim().toLowerCase();

        const escapedSearch = escapeStringRegexp(search);

        const searchQuery = {
            $or: [
                { name: new RegExp(escapedSearch, 'i') },
                {
                    symlinks: {
                        $in: [new RegExp(escapedSearch, 'i')]
                    }
                }
            ]
        }

        const skip: number = req.skip || 0;
        const limit: number = Number(req.query.limit as string) || 10;
        const total: number = await Genre.countDocuments();
        const genres: Array<IGenre> = await Genre.find(searchQuery)
            .skip(skip)
            .limit(limit)
            .lean();

        const data = {
            genres,
            pagination: {
                page: req.query.page,
                limit: req.query.limit,
                total
            }
        };
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const getGenresNotDetailed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const genres: Array<IGenre> = await Genre.find().select('name');
        const data = { genres };
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
}

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
        if (!genre) {
            const error : ResponseError = new Error('Genre not found');
            error.code = 404;
            throw error;
        }

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

