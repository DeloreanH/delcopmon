import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteMaintenanceDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
