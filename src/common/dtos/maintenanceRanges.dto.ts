import {  IsNotEmpty, IsDateString } from 'class-validator';

export class maintenanceRangesDTO{
    @IsNotEmpty()
    @IsDateString()
    readonly startDate: Date;
    @IsNotEmpty()
    @IsDateString()
    readonly endDate: Date;

}
