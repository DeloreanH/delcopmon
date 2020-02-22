import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreNonWorkingDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
