import {  IsNotEmpty, IsString, IsMongoId, IsOptional, IsDateString } from 'class-validator';

export class createMaintenanceDTO {

    @IsNotEmpty()
    @IsDateString()
    readonly date: string;
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
}
