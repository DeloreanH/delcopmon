import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class updateSparePartDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
