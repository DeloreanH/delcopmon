import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const MaintenanceSchema = new Schema({
    date: {
        type: Date,
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: modelName.CUSTOMER,
    },
    customerEquipmentsId: {
        type: Schema.Types.ObjectId,
        ref: modelName.CUSTOMER_EQUIPMENTS,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: modelName.USER,
    },
    spare: {
        parts: [{
            partId: {
                type: Schema.Types.ObjectId,
                ref: modelName.CUSTOMER_EQUIPMENTS,
            },
           partDate: Date,
        }],
      },
    maintenanceType: {
        type: String,
        enum: ['Operativo', 'Parcialmente operativo', 'No operativo'],
    },
    priority: {
        type: String,
    },
    description: {
        type: String,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});
