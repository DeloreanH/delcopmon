import { Document} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    role: string;
    deleted: boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IPayload {
    exp: number;
    iat: number;
    sub: {id: string};
}

export interface ISesion extends Document {
    user_id: string;
    token: string;
    blacklist: boolean;
    created: Date;
    expireAt: Date;
}

export interface IAuthResponse {
    expiresIn: string;
    access_token: string;
    user: IUser;
}

export interface IPasswordReset extends Document {
    user_id: string;
    uuid: string;
    created: Date;
    expireAt: Date;
}

export interface ICustomer extends Document {
    customerName: string;
    rif: string;
    address: string;
    city: string;
    state: string;
    referenceAddress: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

export interface IConfigurations extends Document {
    name: string;
    value: any;
    createdAt: Date;
    updatedAt: Date;
}

export interface IEquipment extends Document {
    modell: string;
    code: string;
    name: string;
    brand: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

export interface INonWorking extends Document {
    date: Date;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}
