import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class deleteUserDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly userId: string;
}
