import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class restoreUserDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly userId: string;
}
