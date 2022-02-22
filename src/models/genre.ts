import { Schema, model } from 'mongoose';

export interface IGenre {
    name: string,
    symlinks: Array<string>
}

const genreSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    symlinks: [
        {
            type: String
        }
    ]
});

export default model<IGenre>('Genre', genreSchema);
