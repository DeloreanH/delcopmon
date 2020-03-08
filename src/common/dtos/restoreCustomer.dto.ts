import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreCustomerDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
