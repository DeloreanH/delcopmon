import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const CustomerEquipmentSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: modelName.CUSTOMER,
    },
    equipmentId: {
        type: Schema.Types.ObjectId,
        ref: modelName.EQUIPMENT,
    },
    serial: {
        type: String,
        unique: true,
    },
    date: {
        type: Date,
    },
    condition: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
