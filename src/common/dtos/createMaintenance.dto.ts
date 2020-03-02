import { PartDTO } from './part.dto';
import { IsDate, IsArray, IsNotEmpty, IsString, IsMongoId, IsOptional } from 'class-validator';

export class createMaintenanceDTO {
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
    @IsNotEmpty()
    @IsString()
    readonly maintenanceType: string;
    @IsOptional()
    @IsString()
    readonly priority: string;
    @IsOptional()
    @IsString()
    readonly description: string;
}
