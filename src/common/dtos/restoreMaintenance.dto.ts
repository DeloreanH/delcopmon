import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreMaintenanceDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
}
