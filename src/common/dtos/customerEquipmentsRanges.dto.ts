import { IsDate, IsNotEmpty } from 'class-validator';

export class customerEquipmentsRangesDTO{
    @IsNotEmpty()
    @IsDate()
    readonly startDate: Date;
    @IsNotEmpty()
    @IsDate()
    readonly endDate: Date;

}
