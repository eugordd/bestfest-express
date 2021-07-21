import { Schema, model } from 'mongoose';

const artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genres: [{
        type: String
    }]
});

export default model('Artist', artistSchema);
