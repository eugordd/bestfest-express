import { Schema, model } from 'mongoose';

const artistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'Genre'
    }],
});

export default model('Artist', artistSchema);
