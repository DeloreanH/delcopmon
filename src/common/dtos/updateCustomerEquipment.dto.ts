import { IsNotEmpty, IsString, IsMongoId, IsArray, IsDateString } from 'class-validator';
import { PartDTO } from './part.dto';

export class updateCustomerEquipmentDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
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
    @IsDateString()
    lastUpdated: Date;
    @IsNotEmpty()
    @IsDateString()
    adquisitionDate: Date;
    @IsArray()
    readonly parts: [PartDTO];
    @IsNotEmpty()
    @IsString()
    readonly equipmentStatus: string;
}
