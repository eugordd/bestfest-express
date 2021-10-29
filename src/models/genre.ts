import { Schema, model } from 'mongoose';

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

export default model('Genre', genreSchema);
