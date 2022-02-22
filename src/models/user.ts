import { Schema, model, Types } from 'mongoose';

export interface IUser {
    email: string,
    password: string,
    name: string,
    phone: string,
    festivals: Array<Types.ObjectId>
}

const userSchema = new Schema<IUser>({
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
        ref: 'Festival'
    }]
});

export default model<IUser>('User', userSchema);
