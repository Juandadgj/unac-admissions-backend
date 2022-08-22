import {Schema, model, Types} from 'mongoose';

const User = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    first_surname: {
        type: String,
        required: true,
        trim: true,
    },
    second_surname: {
        type: String,
        required: true,
        trim: true,
    },
    document: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    type_document: {
        type: String,
        required: true,
    },
    student_code: {
        type: String,
        unique: true,
        trim: true,
    },
    academic_program: {
        type: String,
        trim: true,
    },
    mail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    roles: [
        {
            type: Types.ObjectId,
            ref: 'role'
        }
    ]
},
{
    timestamps: true,
    versionKey: false,
});

export default model('user', User);
