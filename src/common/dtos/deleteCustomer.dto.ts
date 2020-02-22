import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteCustomerDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
