import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const CustomerEquipmentSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: modelName.CUSTOMER,
    },
    equipment_id: {
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
}, {timestamps: true});
