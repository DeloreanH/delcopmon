import { IsBoolean, IsNotEmpty, IsString, IsMongoId, IsDate } from 'class-validator';

export class createCustomerEquipmentDTO {
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
