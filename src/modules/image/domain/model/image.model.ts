import {
    IsBoolean,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { BoardModel } from '@board/domain/model';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ImageModel {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1 })
    id!: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'Sunset over the mountains',
        description: 'Title of the image',
    })
    title!: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example:
            'A beautiful sunset captured during our trip to the mountains.',
        description: 'Optional description of the image',
        nullable: true,
        required: false,
    })
    description?: string | null;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: 'https://example.com/images/sunset.jpg',
        description: 'URL pointing to the image resource',
    })
    imageUrl!: string;

    @IsOptional()
    @IsISO8601()
    @ApiProperty({
        example: '2024-10-20T12:00:00Z',
        description: 'Optional ISO8601 date when the image was published',
        nullable: true,
        required: false,
        format: 'date-time',
    })
    publishedAt?: Date | null;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({
        example: true,
        description:
            'Optional status indicator (true for active, false for inactive)',
        nullable: true,
        required: false,
    })
    isStatus?: boolean | null;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'Error processing the image',
        description: 'Optional error message related to the image',
        nullable: true,
        required: false,
    })
    errorMessage?: string | null;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        example: 123,
        description: 'Optional ID of the board to which the image is related',
        nullable: true,
        required: false,
    })
    boardId?: number | null;

    @IsOptional()
    @Type(() => BoardModel)
    @ApiProperty({
        type: () => BoardModel,
        description: 'Optional board object associated with the image',
        nullable: true,
        required: false,
    })
    board?: BoardModel | null;
}
