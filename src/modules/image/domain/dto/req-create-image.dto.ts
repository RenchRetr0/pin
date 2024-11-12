import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ReqCreateImageDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'World' })
    title!: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Hello world' })
    description?: string | null;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '1' })
    boardId!: string;
}
