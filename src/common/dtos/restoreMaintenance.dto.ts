import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreMaintenanceDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
}
