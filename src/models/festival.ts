import { Schema, model } from 'mongoose';

const festivalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
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

export default model('Festival', festivalSchema);
