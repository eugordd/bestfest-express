import { NextFunction, Request, Response } from "express";

import Artist from "../models/artist";

type ArtistRequestBody = {
    name: string,
    genres: string[]
}

type ArtistRequestParams = {
    artistId: string
}

type Artist = {
    name: string,
    genres: Object[]
}

export const getArtists = async (req: Request, res: Response, next: NextFunction) => {
    const artists: Array<Artist> = await Artist.find();
    const data = {
        artists
    };

    res.status(200).json(data);
};

export const addArtist = async (req: Request, res: Response, next: NextFunction) => {
    const { name, genres } = req.body as ArtistRequestBody;

    const artist = new Artist({
        name,
        genres
    });
    await artist.save();
    const data = {
        artist: artist
    }
    res.status(200).json(data);
}

export const getArtist = async (req: Request, res: Response, next: NextFunction) => {
    const { artistId } = req.params as ArtistRequestParams;

    const artist = await Artist.findById(artistId);
    const data = {
        artist
    };

    res.status(200).json(data);
};

export const editArtist = async (req: Request, res: Response, next: NextFunction) => {
    const { artistId } = req.params as ArtistRequestParams;
    const { name, genres } = req.body as ArtistRequestBody;

    const artist = await Artist.findById(artistId);
    artist.name = name;
    artist.genres = genres;
    await artist.save()
    const data = {
        artist: artist._doc
    };

    res.status(200).json(data);
};

export const deleteArtist = async (req: Request, res: Response, next: NextFunction) => {
    const { artistId } = req.params as ArtistRequestParams;
    await Artist.findByIdAndRemove(artistId);
    res.status(200);
};

export default { getArtists, getArtist, addArtist, editArtist, deleteArtist };
