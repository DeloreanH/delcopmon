import { IsEmail, IsNotEmpty } from 'class-validator';

export class passwordResetDTO {
   @IsNotEmpty()
   @IsEmail()
   readonly email: string;
}
