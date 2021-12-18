import { NextFunction, Request, Response } from "express";
import { ObjectId } from 'mongodb';

import Festival from '../models/festival';
import Artist from '../models/artist';
import { countries } from "countries-list";
import {log} from "util";

type ArtistQueryParam = {
    _id: string,
    priority: number
}

export const findFestivals = async (req: Request, res: Response, next: NextFunction) => {
    const yearStart: string = new Date(new Date().getFullYear(), 0, 1).toISOString();
    const yearEnd: string = new Date(new Date().getFullYear(), 12, 31).toISOString();

    const continents : Array<string> = req.body.continents as Array<string> || [];
    const dateStart: string = req.body.dateStart as string|| yearStart;
    const dateEnd: string = req.body.dateEnd as string || yearEnd;
    const artists: Array<ArtistQueryParam> = req.body.artists as unknown as Array<ArtistQueryParam> || [];

    const countriesInContinents = Object.entries(countries)
        .filter(country => continents.includes(country[1].continent))
        .map(country => country[0])

    const aggregation = [
        {
            $match: {
                $and: [
                    { artists: { $in: artists.map(artist => new ObjectId(artist._id)) } },
                    { country: { $in: countriesInContinents } },
                    { dateStart: { $gte: new Date(dateStart) } },
                    { dateEnd: { $lte: new Date(dateEnd) } }
                ]
            }
        },
        {
            $lookup: {
                from: Artist.collection.name,
                localField: 'artists',
                foreignField: '_id',
                as: 'artists'
            }
        }
    ]

    const festivals = await Festival.aggregate(aggregation);

    const formattedFestivals = festivals.map(festival => {
        let festivalPriority = 0, matchedArtists: Array<any> = [];
        festival.artists.forEach((festivalArtist: any) => {
            artists.forEach(searchingArtist => {
                if (festivalArtist._id.toString() === searchingArtist._id) {
                    festivalPriority += searchingArtist.priority
                    matchedArtists.push(festivalArtist);
                }
            })
        })
        return {
            ...festival,
            priority: festivalPriority,
            matchedArtists
        }
    })

    const data = {
        festivals: formattedFestivals.sort((a, b) => b.priority - a.priority)
    };
    return res.status(200).json(data);
}

export const getArtists = async (req: Request, res: Response, next: NextFunction) => {
    let search = req.query.search as string;
    if (!search) search = '';
    search = search.trim().toLowerCase();

    const artists: Array<Object> = await Artist.find({ name: new RegExp(search, 'i') });

    const data = {
        artists
    };
    return res.status(200).json(data);
}
