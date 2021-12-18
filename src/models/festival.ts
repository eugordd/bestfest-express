import { Schema, Types, model } from 'mongoose';
import { countries } from "countries-list";

export interface FestivalModel {
    name: string,
    description: string,
    country: string,
    place: string,
    dateStart: Date,
    dateEnd: Date,
    genres: Array<Types.ObjectId>,
    artists: Array<Types.ObjectId>,
}


const festivalSchema = new Schema<FestivalModel>({
    name: {
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
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }],
    artists: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }]
});

export default model('Festival', festivalSchema);
