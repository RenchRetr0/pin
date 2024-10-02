import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    accessToken!: string;

    @IsNotEmpty()
    @IsString()
    refreshToken!: string;
}
