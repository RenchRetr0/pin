import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsOptional()
    @IsString()
    description?: string | null;

    @IsOptional()
    @IsString()
    imageUrl!: string;

    @IsOptional()
    @IsNumber()
    userId!: number;
}
