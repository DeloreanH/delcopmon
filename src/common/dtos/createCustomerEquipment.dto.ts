import { IsBoolean, IsNotEmpty, IsString, IsMongoId, IsDate, IsArray } from 'class-validator';
import { PartDTO } from './part.dto';

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
    @IsBoolean()
    readonly deleted: boolean;
    @IsNotEmpty()
    @IsDate()
    lastUpdated: Date;
    @IsNotEmpty()
    @IsDate()
    adquisitionDate: Date;
    @IsArray()
    readonly parts: [PartDTO];
    @IsNotEmpty()
    @IsString()
    readonly equipmentStatus: string;
}
