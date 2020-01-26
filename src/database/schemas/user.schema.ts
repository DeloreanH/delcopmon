import { Schema } from 'mongoose';
import { Tools } from '../../common/tools/tools';
import { compare } from 'bcrypt';

export const userSchema = new Schema({
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        set: Tools.removeSpaces,
        lowercase: true,
        sparse: true,
    },
    role: {
        type: String,
        enum : ['admin', 'basic'],
        default: 'basic',
    },
    sysAccess: {
        type: Boolean,
        default: true,
    },
}, {timestamps: true});

/*
userSchema.pre<IUser>('save', async function(next) {
    try {
        if (!this.isModified('password')) {
          return next();
        }
        const hashed  = await hash(this.password, 10);
        this.password = hashed;
        return next();
      } catch (err) {
        return next(err);
      }
    });
*/

userSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
    const password = this.password;
    return new Promise((resolve, reject) => {
        compare(candidatePassword, password, (err, success) => {
            if (err) {
                return reject(err);
             }
            return resolve(success);
        });
    });
};

userSchema.set('toJSON', {
    transform(doc, ret, opt) {
        delete ret.password;
        return ret;
    },
});
