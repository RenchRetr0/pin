import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsISO8601,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class ReqCreateImageTimeDto {
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

    @IsNotEmpty()
    @IsISO8601()
    @ApiProperty({
        example: '2020-02-02T12:45:00',
        description: 'Time in UTC format',
    })
    publishedAt!: Date;
}
