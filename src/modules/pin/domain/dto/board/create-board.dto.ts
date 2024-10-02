import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto {
    @IsNotEmpty()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsOptional()
    @IsString()
    boardId?: string | null;

    @IsOptional()
    @IsString()
    privacy?: string | null;

    @IsOptional()
    @IsNumber()
    userId!: number;
}
