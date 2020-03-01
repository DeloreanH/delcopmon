import { PartDTO } from './part.dto';
import { IsNotEmpty, IsString, IsMongoId, IsDate, IsArray, IsOptional } from 'class-validator';
export class updateMaintenanceDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsDate()
    readonly date: Date;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly customerId: string;
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly customerEquipmentsId: string;
    @IsOptional()
    @IsString()
    @IsMongoId()
    readonly userId: string;
    @IsArray()
    readonly parts: [PartDTO];
    @IsNotEmpty()
    @IsString()
    readonly maintenanceType: string;
    @IsNotEmpty()
    @IsString()
    readonly equipmentStatus: string;
    @IsOptional()
    @IsString()
    readonly priority: string;
    @IsOptional()
    @IsString()
    readonly description: string;
}
