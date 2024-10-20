import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
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
}
