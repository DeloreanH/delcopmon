
import { IsNotEmpty, IsString, IsMongoId, IsOptional, IsDateString, IsArray } from 'class-validator';
import { PartDTO } from './part.dto';
export class updateMaintenanceDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsDateString()
    readonly date: Date;
    @IsNotEmpty()
    @IsMongoId()
    readonly customerId: string;
    @IsNotEmpty()
    @IsMongoId()
    readonly customerEquipmentsId: string;
    @IsOptional()
    @IsMongoId()
    readonly userId: string;
    @IsNotEmpty()
    @IsString()
    readonly maintenanceType: string;
    @IsOptional()
    @IsString()
    readonly priority: string;
    @IsOptional()
    @IsString()
    readonly description: string;
    @IsOptional()
    @IsArray()
    readonly parts: [PartDTO];
    @IsOptional()
    @IsString()
    readonly equipmentStatus: string
}
