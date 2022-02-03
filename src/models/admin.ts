import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    festivals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Festival'
        }
    ]
});

export default model('Admin', adminSchema);
