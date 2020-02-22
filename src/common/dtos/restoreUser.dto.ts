import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreUserDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly userId: string;
}
