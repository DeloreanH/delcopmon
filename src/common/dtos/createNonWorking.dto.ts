import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class createNonWorkingDTO {
    @IsNotEmpty()
    @IsDate()
    readonly date: Date;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
