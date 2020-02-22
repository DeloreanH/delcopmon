import { IsNotEmpty, IsString } from 'class-validator';

export class passwordNewDTO {
   @IsNotEmpty()
   @IsString()
   readonly uuid: string;
   @IsNotEmpty()
   @IsString()
   readonly password: string;
}
