import { Schema, model } from 'mongoose';
import { countries } from "countries-list";

const festivalSchema = new Schema({
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
