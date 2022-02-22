import { NextFunction, Request, Response } from "express";
import { ObjectId } from 'mongodb';

import { FestivalModel } from '../models/festival';
import Artist, {IArtist} from '../models/artist';
import { countries } from "countries-list";

type ArtistQueryParam = {
    _id: string,
    priority: number
}

interface IArtistWithPriority extends IArtist {
    priority: number
}

export const findFestivals = async (req: Request, res: Response, next: NextFunction) => {
    const yearStart = new Date(new Date().getFullYear(), 0, 1).toISOString();
    const yearEnd = new Date(new Date().getFullYear(), 12, 31).toISOString();

    const continents = req.body.continents as Array<string>;
    const dateStart = req.body.dateStart;
    const dateEnd = req.body.dateEnd;
    const artists = req.body.artists as Array<ArtistQueryParam>;

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

    const festivals = await FestivalModel.aggregate(aggregation);

    const formattedFestivals = festivals.map(festival => {
        let festivalPriority = 0, matchedArtists: Array<IArtistWithPriority> = [];
        festival.artists.forEach((festivalArtist: any) => {
            artists.forEach(searchingArtist => {
                if (festivalArtist._id.toString() === searchingArtist._id) {
                    festivalPriority += searchingArtist.priority
                    matchedArtists.push({
                        ...festivalArtist,
                        priority: searchingArtist.priority
                    });
                }
            })
        })
        return {
            ...festival,
            priority: festivalPriority,
            matchedArtists: matchedArtists.sort((a, b) => b.priority - a.priority)
        }
    })

    const data = {
        festivals: formattedFestivals.sort((a, b) => b.priority - a.priority)
    };
    return res.status(200).json(data);
}

export const getArtists = async (req: Request, res: Response, next: NextFunction) => {
    let search = req.query.search as string;
    let selected = req.query.selected as Array<string>;

    if (!search) search = '';
    search = search.trim().toLowerCase();

    const artists: Array<Object> = await Artist
        .find({
            name: new RegExp(search, 'i'),
            _id: { "$nin": selected }
        })
        .limit(5);

    const data = {
        artists
    };
    return res.status(200).json(data);
}
