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
    lastUpdated: {
        type: Date,
    },
    adquisitionDate: {
        type: Date,
    },
    parts: [
        {
        partId: {
            type: Schema.Types.ObjectId,
            ref: modelName.CUSTOMER_EQUIPMENTS,
        },
        partDate: Date,
       },
    ],
    equipmentStatus: {
        type: String,
        enum: ['Operativo', 'Parcialmente operativo', 'No operativo'],
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
