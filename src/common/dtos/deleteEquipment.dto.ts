import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteEquimentDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
