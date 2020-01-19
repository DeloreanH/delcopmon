import { Schema } from 'mongoose';

export const EquipmentSchema = new Schema({
    model: {
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
}, {timestamps: true});
