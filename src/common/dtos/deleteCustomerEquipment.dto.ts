import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteCustomerEquipmentDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
