import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteCustomerEquipmentDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
