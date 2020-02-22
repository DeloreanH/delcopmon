import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteUserDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly userId: string;
}
