import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class updateUserDTO {
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
