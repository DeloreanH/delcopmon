import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteCustomerDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
