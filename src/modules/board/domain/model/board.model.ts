import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@user/domain/model';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BoardModel {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1 })
    id!: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'World' })
    name!: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Hello world' })
    description?: string | null;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'PUBLIC' })
    privacy!: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 1 })
    boardId!: string;

    @IsOptional()
    @IsNumber()
    @ApiHideProperty()
    userId?: number | null;

    @IsOptional()
    @Type(() => UserModel)
    @ApiHideProperty()
    user?: UserModel | null;
}
