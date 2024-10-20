import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateImageTimeDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'World' })
    title!: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Hello world' })
    description?: string | null;

    @IsOptional()
    @IsString()
    @ApiHideProperty()
    imageUrl!: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1 })
    boardId!: number;

    @IsNotEmpty()
    @IsISO8601()
    @ApiProperty({
        example: '2020-02-02T12:45:00',
        description: 'Time in UTC format',
    })
    publishedAt!: Date;

    @IsOptional()
    @IsBoolean()
    @ApiHideProperty()
    isStatus?: boolean | null;
}
