import { Schema, model } from 'mongoose';
import { countries } from "countries-list";

const artistSchema = new Schema({
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
});

export default model('Artist', artistSchema);
