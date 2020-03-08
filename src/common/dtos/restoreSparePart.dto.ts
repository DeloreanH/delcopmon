import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreSparePartDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
