import { IsNotEmpty, IsDateString } from 'class-validator';

export class customerEquipmentsRangesDTO{
    @IsNotEmpty()
    @IsDateString()
    readonly startDate: Date;
    @IsNotEmpty()
    @IsDateString()
    readonly endDate: Date;

}
