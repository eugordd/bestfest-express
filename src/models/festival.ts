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
        type: String
    }],
    artists: [{
        type: Schema.Types.ObjectId,
        ref: 'Artists'
    }]
});

export default model('Festival', festivalSchema);
