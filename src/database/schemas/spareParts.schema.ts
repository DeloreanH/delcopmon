import { Schema } from 'mongoose';

export const sparePartsSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
