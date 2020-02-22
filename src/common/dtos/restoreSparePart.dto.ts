import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreSparePartDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
