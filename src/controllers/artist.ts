import { NextFunction, Request, Response } from "express";

import Artist from "../models/artist";
import { validationResult } from "express-validator";
import formatValidationError from "../utils/formatValidationError";

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
        const total: number = await Artist.countDocuments();
        const artists: Array<Artist> = await Artist.find()
            .limit(req.query.limit)
            .skip(req.skip)
            .populate('genres')
            .lean();

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
            artist: artist._doc
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

export default { getArtists, getArtist, addArtist, editArtist, deleteArtist, deleteArtistsList };
