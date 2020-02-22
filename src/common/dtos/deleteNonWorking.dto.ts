import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteNonWorkingDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
