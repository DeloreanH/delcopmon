import { IsNotEmpty, IsString } from 'class-validator';

export class changePasswordDTO {
   @IsNotEmpty()
   @IsString()
   readonly newPassword: string;
}
