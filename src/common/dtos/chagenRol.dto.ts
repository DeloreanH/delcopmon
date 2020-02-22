import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class changeRolDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly userId: string;
    @IsNotEmpty()
    @IsString()
    readonly rol: string;
}
