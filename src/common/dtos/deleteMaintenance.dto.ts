import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteMaintenanceDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
