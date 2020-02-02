import { Schema } from 'mongoose';

export const ConfigurationSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    value: {
        type: Object,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
