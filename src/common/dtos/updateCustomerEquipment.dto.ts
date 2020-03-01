import { IsNotEmpty, IsString, IsMongoId, IsBoolean, IsDate } from 'class-validator';

export class updateCustomerEquipmentDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly customerName: string;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly customerId: string;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly equipmentId: string;
    @IsNotEmpty()
    @IsString()
    readonly serial: string;
    @IsNotEmpty()
    @IsString()
    readonly condition: string;
    @IsNotEmpty()
    @IsBoolean()
    readonly deleted: boolean;
    @IsNotEmpty()
    @IsDate()
    lastUpdated: Date;
    @IsNotEmpty()
    @IsDate()
    adquisitionDate: Date;
}
