import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class updateEquimentDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly modell: string;
    @IsNotEmpty()
    @IsString()
    readonly code: string;
    @IsNotEmpty()
    @IsString()
    readonly brand: string;
}