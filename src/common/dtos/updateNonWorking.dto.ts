import { IsNotEmpty, IsString, IsMongoId, IsDate, IsDateString } from 'class-validator';

export class updateNonWorkingDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsDateString()
    readonly date: string;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
