import { NextFunction, Request, Response } from "express";

import Festival from '../../models/festival';
import Genre from '../../models/genre';
import Artist from '../../models/artist';

import formatValidationError from "../../utils/formatValidationError";
import { validationResult } from "express-validator";
import escapeStringRegexp from "../../utils/escapeRegExp";
import searchByCountry from "../../utils/mongoose/searchByCountry";

type FestivalRequestParams = {
    festivalId: string
}

type FestivalRequestBody = {
    name: string,
    description: string,
    country: string,
    place: string,
    dateStart: Date,
    dateEnd: Date,
    genres: string[],
    artists: string[]
}

type FestivalsListRequestBody = {
    ids: Array<string>
}

export const getFestivals = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let search = req.query.search as string;
        if (!search) search = '';
        search = search.trim().toLowerCase();

        const escapedSearchRegExp = new RegExp(escapeStringRegexp(search), 'i');
        const searchCountry = {
            $in: searchByCountry(search)
        };

        const aggregation = [
            {
                $lookup: {
                    from: Genre.collection.name,
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genres'
                },
            },
            {
                $lookup: {
                    from: Artist.collection.name,
                    localField: 'artists',
                    foreignField: '_id',
                    as: 'artists'
                },
            },
            {
                $match: {
                    $or: [
                        { name: escapedSearchRegExp },
                        { description: escapedSearchRegExp },
                        { country: searchCountry },
                        { 'genres.name': escapedSearchRegExp },
                        { 'genres.symlinks': { $in: [escapedSearchRegExp] } },
                        { 'artists.name': escapedSearchRegExp }
                    ]
                }
            },
            {
                $skip: req.skip
            },
            {
                $limit: req.query.limit
            }
        ]

        const total: number = await Festival.countDocuments();
        const festivals: Array<Object> = await Festival.aggregate(aggregation);

        const data = {
            festivals,
            pagination: {
                page: req.query.page,
                limit: req.query.limit,
                total,
            }
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

        const { name, description, country, place, dateStart, dateEnd, genres, artists } = req.body as FestivalRequestBody;
        const festival = new Festival({
            name,
            description,
            country,
            place,
            dateStart,
            dateEnd,
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
        const festival = await Festival.findById(festivalId).populate('artists');
        const data = {
            festival
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const editFestival = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { festivalId } = req.params as FestivalRequestParams;
        const { name, description, country, place, dateStart, dateEnd, genres, artists } = req.body as FestivalRequestBody

        const festival = await Festival.findById(festivalId);
        festival.name = name;
        festival.description = description;
        festival.country = country;
        festival.place = place;
        festival.dateStart = dateStart;
        festival.dateEnd = dateEnd;
        festival.genres = genres;
        festival.artists = artists;
        festival.save();

        const data = {
            festival
        };
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const deleteFestival = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { festivalId } = req.params as FestivalRequestParams;
        await Festival.findByIdAndRemove(festivalId);

        const data = {
            message: 'Deleted successfully'
        };
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
}

export const deleteFestivalsList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ids } = req.body as FestivalsListRequestBody;
        await Festival.deleteMany({ _id: { $in: ids } });

        const data = {
            message: 'Deleted successfully'
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export default { getFestivals, addFestival, getFestival, editFestival, deleteFestival, deleteFestivalsList };
