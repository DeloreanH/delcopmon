import { IsNotEmpty, IsString } from 'class-validator';

export class createSparePartDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
