import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginUserDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
