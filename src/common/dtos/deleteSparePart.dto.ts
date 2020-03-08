import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteSparePartDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
