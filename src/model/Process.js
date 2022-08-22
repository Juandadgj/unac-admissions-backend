import {Schema, model} from 'mongoose';

const Process = new Schema({
    title: {
        type: String,
        required: true,
    },
    steps: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            }
        }
    ]
},
{
    timestamps: false,
    versionKey: false,
});

export default model('process', Process);
