import { Schema, model, Types } from 'mongoose';

export interface IAdmin {
    username: string,
    email: string,
    password: string,
    name: string,
    festivals: Array<Types.ObjectId>
}

const adminSchema = new Schema<IAdmin>({
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

export default model<IAdmin>('Admin', adminSchema);
