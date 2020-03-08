import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteEquimentDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
