import { Schema } from 'mongoose';

export const ConfigurationSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    value: {
        type: Schema.Types.Mixed,
    },
}, {timestamps: true});
