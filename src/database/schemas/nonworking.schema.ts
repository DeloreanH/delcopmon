import { Schema } from 'mongoose';

export const NonworkingSchema = new Schema({
    date: {
        type: Date,

    },
    description: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
