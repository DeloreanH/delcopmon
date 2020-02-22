import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class updateCustomerDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly customerName: string;
    @IsNotEmpty()
    @IsString()
    readonly rif: string;
    @IsNotEmpty()
    @IsString()
    readonly address: string;
    @IsNotEmpty()
    @IsString()
    readonly city: string;
    @IsNotEmpty()
    @IsString()
    readonly state: string;
    @IsNotEmpty()
    @IsString()
    readonly referenceAddress: string;
}
