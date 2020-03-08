import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';

export class updateUserDTO {
    @IsNotEmpty()
    @IsMongoId()
    readonly _id: string;
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
