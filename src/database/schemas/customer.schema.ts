import { Schema } from 'mongoose';

export const CustomerSchema = new Schema({
    customerName: {
        type: String,
    },
    rif: {
        type: String,
        unique: true,
        lowercase: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    referenceAddress: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
