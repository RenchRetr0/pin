import { ImageModel } from '@pin/domain/model';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserModel {
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsNotEmpty()
    @IsString()
    login!: string;

    @IsOptional()
    @IsString()
    accessToken?: string | null;

    @IsOptional()
    @IsString()
    refreshToken?: string | null;

    @IsOptional()
    @Type(() => Array<ImageModel>)
    images?: Array<ImageModel> | null;
}
