import { UserModel } from '@user/domain/model';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ImageModel {
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsNotEmpty()
    @IsString()
    imageUrl!: string;

    @IsOptional()
    @IsNumber()
    userId?: number | null;

    @IsOptional()
    @Type(() => UserModel)
    user?: UserModel | null;
}
