import { IsNotEmpty, IsString } from 'class-validator';

export class createSparePartDTO {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}

export class PartDTO{
    readonly partId: string;
    readonly partDate: Date;
}