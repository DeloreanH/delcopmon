import { Schema } from 'mongoose';

export const EquipmentSchema = new Schema({
    modell: {
        type: String,
        unique: true,
    },
    code: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    brand: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
