import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveImagePinDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsNotEmpty()
    @IsString()
    imageUrl!: string;

    @IsNotEmpty()
    @IsString()
    boardId!: string;
}
