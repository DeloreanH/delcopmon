import { IsNotEmpty, IsString } from 'class-validator';

export class createEquimentDTO {
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
