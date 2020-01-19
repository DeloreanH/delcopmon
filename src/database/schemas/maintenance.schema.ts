import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const MaintenanceSchema = new Schema({
    date: {
        type: Date,
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: modelName.CUSTOMER,
    },
    customerEquipments_id: {
        type: Schema.Types.ObjectId,
        ref: modelName.CUSTOMER_EQUIPMENTS,
    },
    maintenanceType: {
        type: String,
    },
    priority: {
        type: String,
    },
    description: {
        type: String,
    },
}, {timestamps: true});
