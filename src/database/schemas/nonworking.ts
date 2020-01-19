import { Schema } from 'mongoose';

export const NonworkingSchema = new Schema({
    date: {
        type: Date,

    },
    description: {
        type: String,
    },

}, {timestamps: true});
