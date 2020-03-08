import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class createNonWorkingDTO {
    @IsNotEmpty()
    @IsDateString()
    readonly date: string;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
