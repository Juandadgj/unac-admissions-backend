import {Schema, model} from 'mongoose';

export const ROLES = ['student', 'coordinator'];

const Role = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    }
},
{
    versionKey: false,
});

export default model('role', Role);
