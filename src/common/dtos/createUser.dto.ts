import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class createUserDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    readonly role: string;
}
