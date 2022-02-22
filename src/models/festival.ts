import { Schema, Types, model } from 'mongoose';
import { countries } from "countries-list";

export interface IFestival {
    name: string,
    shortName: string,
    description: string,
    country: string,
    place: string,
    dateStart: Date,
    dateEnd: Date,
    imageUrl: string,
    genres: Array<Types.ObjectId>,
    artists: Array<Types.ObjectId>,
}

const festivalSchema = new Schema<IFestival>({
    name: {
        type: String,
        required: true
    },
    shortName: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    country: {
        type: String,
        required: true,
        enum: Object.keys(countries)
    },
    place: {
        type: String
    },
    dateStart: {
        type: Date
    },
    dateEnd: {
        type: Date
    },
    imageUrl: {
        type: String,
    },
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    artists: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }]
});

export const FestivalModel = model<IFestival>('Festival', festivalSchema);
