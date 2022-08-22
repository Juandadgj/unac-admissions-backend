import { Schema, model, Types } from 'mongoose';

const Request = new Schema({
    user: {
        type: Types.ObjectId,
        ref: 'user'
    },
    process: {
        type: Types.ObjectId,
        ref: 'process'
    },
    signature_coordinator: { type: Boolean },
    signature_teacher: { type: Boolean },
    course_to_cancel: { type: String },
    teacher: { type: String },
    final_note: { type: Number },
    absences: { type: Number },
    date_last_absence: { type: String },
},
{
    timestamps: true,
    versionKey: false,
});

export default model('request', Request);
