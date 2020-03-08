import { IsNotEmpty, IsMongoId } from 'class-validator';

export class deleteNonWorkingDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
