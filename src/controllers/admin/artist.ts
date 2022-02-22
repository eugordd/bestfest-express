import { NextFunction, Request, Response } from "express";

import Artist from '../../models/artist';
import Genre from '../../models/genre';

import { validationResult } from "express-validator";
import formatValidationError from "../../utils/formatValidationError";
import { countries, continents } from "countries-list";
import searchByCountry from "../../utils/searchByCountry";
import escapeStringRegexp from "../../utils/escapeRegExp";

type ArtistRequestBody = {
    name: string,
    description: string,
    country: string,
    genres: Array<string>
}

type ArtistsListRequestBody = {
    ids: Array<string>
}

type ArtistRequestParams = {
    artistId: string
}

type Artist = {
    name: string,
    genres: Array<Object>
}

export const getArtists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // noinspection DuplicatedCode
        let search = req.query.search as string;
        if (!search) search = '';
        search = search.trim().toLowerCase();

        const escapedSearchRegExp = new RegExp(escapeStringRegexp(search), 'i');
        const searchCountry = {
            $in: searchByCountry(search)
        };

        const skip: number = req.skip || 0;
        const limit: number = Number(req.query.limit as string) || 10;

        const aggregation = [
            {
                $lookup: {
                    from: Genre.collection.name,
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genres'
                }
            },
            {
                $match: {
                    $or: [
                        { name: escapedSearchRegExp },
                        { description: escapedSearchRegExp },
                        { country: searchCountry },
                        { 'genres.name': escapedSearchRegExp },
                        { 'genres.symlinks': { $in: [escapedSearchRegExp] } }
                    ]
                }
            },
            {
                $skip: skip
            },
            {
                $limit: limit
            }
        ];

        const total: number = await Artist.countDocuments();
        const artists: Array<Artist> = await Artist.aggregate(aggregation);

        const data = {
            artists,
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

export const getArtistsNotDetailed = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const artists = await Artist.find().select('name').lean();
        const data = {
            artists
        };
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
}

export const addArtist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return next(formatValidationError(errors));

        const { name, description, country, genres } = req.body as ArtistRequestBody;
        
        const artist = new Artist({
            name,
            description,
            country,
            genres
        });
        await artist.save();

        const data = {
            artist: artist
        }
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
}

export const getArtist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { artistId } = req.params as ArtistRequestParams;
        const artist = await Artist.findById(artistId);
        const data = {
            artist
        };
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }

};

export const editArtist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { artistId } = req.params as ArtistRequestParams;
        const { name, description, country, genres } = req.body as ArtistRequestBody;

        const artist = await Artist.findById(artistId);
        artist.name = name;
        artist.description = description;
        artist.country = country;
        artist.genres = genres;
        await artist.save()

        const data = {
            artist
        };
        res.status(200).json(data);
    } catch (e) {
        next(e);
    }
};

export const deleteArtist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { artistId } = req.params as ArtistRequestParams;
        await Artist.findByIdAndRemove(artistId);

        const data = {
            message: 'Deleted successfully'
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export const deleteArtistsList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ids } = req.body as ArtistsListRequestBody;
        await Artist.deleteMany({ _id: { $in: ids } });

        const data = {
            message: 'Deleted successfully'
        }
        res.status(200).json(data);
    } catch (e) {
        next(e)
    }
};

export default { getArtists, getArtistsNotDetailed, getArtist, addArtist, editArtist, deleteArtist, deleteArtistsList };
