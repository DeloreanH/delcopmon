import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreEquimentDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
