import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreCustomerEquipmentDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
