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
export interface ICustomerEquipments extends Document {
    customerId: string;
    equipmentId: string;
    serial: string;
    date: Date;
    condition: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}
export interface IMaintenance extends Document {
    date: Date;
    customerId: string;
    customerEquipmentsId: string;
    userId: string;
    spare: {
        parts: [IPart],
    };
    maintenanceType: string;
    priority: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

export interface IPart {
    partId: string;
    partDate: Date;
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

export interface ISparePart extends Document {
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}
