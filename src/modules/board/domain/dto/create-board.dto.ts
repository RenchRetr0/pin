import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'World' })
    name!: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Hello world' })
    description?: string | null;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 1 })
    boardId?: string | null;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'PUBLIC' })
    privacy?: string | null;

    @IsOptional()
    @IsNumber()
    @ApiHideProperty()
    userId!: number;
}
