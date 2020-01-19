import { Schema } from 'mongoose';
import { modelName } from '../model-names';

export const passwordResetSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: modelName.USER,
    },
    uuid: {
        type: String,
        unique: true,
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

passwordResetSchema.index( { expireAt: 1 }, { expireAfterSeconds: 0 } );
