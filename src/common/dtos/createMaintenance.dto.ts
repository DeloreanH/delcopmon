import { PartDTO } from './part.dto';
import { IsDate, IsArray, IsNotEmpty, IsString, IsMongoId } from 'class-validator';

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
    @IsNotEmpty()
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
    @IsNotEmpty()
    @IsString()
    readonly priority: string;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
