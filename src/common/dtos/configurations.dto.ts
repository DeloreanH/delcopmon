import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class configurationsDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    readonly value: any;
}
