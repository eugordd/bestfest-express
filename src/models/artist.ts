import { Schema, model, Types } from 'mongoose';
import { countries } from "countries-list";

export interface IArtist {
    name: string,
    description: string,
    country: string,
    genres: Array<Types.ObjectId>
}

const artistSchema = new Schema<IArtist>({
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

export default model<IArtist>('Artist', artistSchema);
