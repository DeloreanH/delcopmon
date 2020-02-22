import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreCustomerDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
