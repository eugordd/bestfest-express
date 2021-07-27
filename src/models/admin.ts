import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    festivals: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Festival'
        }
    ]
});

export default model('Admin', adminSchema);
