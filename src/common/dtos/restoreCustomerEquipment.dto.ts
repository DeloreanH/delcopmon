import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreCustomerEquipmentDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
