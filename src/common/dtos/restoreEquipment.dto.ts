import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreEquimentDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
