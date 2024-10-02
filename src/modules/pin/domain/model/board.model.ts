import { UserModel } from '@user/domain/model';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BoardModel {
    @IsNotEmpty()
    @IsNumber()
    id!: number;

    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsNotEmpty()
    @IsString()
    privacy!: string;

    @IsNotEmpty()
    @IsString()
    boardId!: string;

    @IsOptional()
    @IsNumber()
    userId?: number | null;

    @IsOptional()
    @Type(() => UserModel)
    user?: UserModel | null;
}
