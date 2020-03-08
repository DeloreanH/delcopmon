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
    planified: boolean;
    serial: string;
    lastUpdated: Date;
    adquisitionDate: Date;
    parts: [IPart];
    equipmentStatus: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}
export interface IMaintenance extends Document {
    date: Date;
    customerId: string;
    customerEquipmentsId: string;
    userId: string;
    maintenanceType: string;
    priority: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    parts?: [IPart];
    equipmentStatus?: string;
}

export interface IPart {
    partId: string;
    partDate: Date;
    days?: number;
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
    brand: string;
    createdAt: Date;
    updatedAt: Date;
    deleted: boolean;
}

export interface INonWorking extends Document {
    date: string;
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
