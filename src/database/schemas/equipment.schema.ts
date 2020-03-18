import { Schema } from 'mongoose';

export const EquipmentSchema = new Schema({
    modell: {
        type: String,
        unique: true,
        lowercase: true,
    },
    code: {
        type: String,
        unique: true,
        lowercase: true,
    },
    brand: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
