import { Schema } from 'mongoose';

export const CustomerSchema = new Schema({
    customerName: {
        type: String,
        unique: true,
    },
    rif: {
        type: String,
        unique: true,
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
