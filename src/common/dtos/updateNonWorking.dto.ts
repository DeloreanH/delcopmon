import { IsNotEmpty, IsString, IsMongoId, IsDate } from 'class-validator';

export class updateNonWorkingDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsDate()
    readonly date: Date;
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
