import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteSparePartDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
