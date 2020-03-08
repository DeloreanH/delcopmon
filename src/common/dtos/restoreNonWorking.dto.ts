import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreNonWorkingDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
