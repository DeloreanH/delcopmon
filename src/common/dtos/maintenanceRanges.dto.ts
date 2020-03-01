import { IsDate, IsNotEmpty } from 'class-validator';

export class maintenanceRangesDTO{
    @IsNotEmpty()
    @IsDate()
    readonly startDate: Date;
    @IsNotEmpty()
    @IsDate()
    readonly endDate: Date;

}
