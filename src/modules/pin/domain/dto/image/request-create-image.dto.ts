import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class RequestCreateImageDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsNotEmpty()
    @IsString()
    boardId!: number;

    @IsOptional()
    @IsString()
    imageUrl!: string;

    @IsOptional()
    @IsNumber()
    userId!: number;
}
