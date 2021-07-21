import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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
    phone: {
        type: String
    },
    festivals: [{
        type: Schema.Types.ObjectId,
        ref: 'Festivals'
    }]
});

export default model('User', userSchema);
