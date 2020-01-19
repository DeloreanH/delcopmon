import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const sesionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: modelName.USER,
    },
    token: {
        type: String,
        unique: true,
    },
    blacklist: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    expireAt: {
        type: Date,
        default: undefined,
         },
});

sesionSchema.index( { expireAt: 1 }, { expireAfterSeconds: 0 } );
