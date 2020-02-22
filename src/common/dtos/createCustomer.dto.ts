import { IsNotEmpty, IsString } from 'class-validator';

export class createCustomerDTO {
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
