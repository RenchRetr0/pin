import {
    Body,
    Controller,
    FileTypeValidator,
    Get,
    Inject,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    ParseIntPipe,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { ICreateImageUseCase } from '@image/domain/use-case/create';
import { IGetImageUseCase } from '@image/domain/use-case/get/image';
import { IGetImagesUseCase } from '@image/domain/use-case/get/images';
import { CreateImageDto, CreateImageTimeDto } from '@image/domain/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterStorageConfig } from '@config/multer-storage.config';
import { GetCurrentUser } from '@common/decorators';
import { JwtPayloadDto } from '@auth/domain/dto';
import { ImageModel } from '@image/domain/model';
import {
    ApiBody,
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiParam,
} from '@nestjs/swagger';

@ApiTags('Images')
@ApiBearerAuth()
@Controller('image')
export class ImageController {
    constructor(
        @Inject(ICreateImageUseCase)
        private readonly createImageUseCase: ICreateImageUseCase,
        @Inject(IGetImagesUseCase)
        private readonly getImagesUseCase: IGetImagesUseCase,
        @Inject(IGetImageUseCase)
        private readonly getImageUseCase: IGetImageUseCase,
    ) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: MulterStorageConfig,
        }),
    )
    @ApiOperation({ summary: 'Create a new image.' })
    @ApiResponse({
        status: 201,
        description: 'Image created',
    })
    @ApiBody({
        description: 'DTO для создания фото с файлом',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Название записи' }, // Поле title
                description: {
                    type: 'string',
                    description: 'Описание записи',
                    nullable: true,
                }, // Поле description
                imageUrl: { type: 'string', description: 'URL изображения' }, // Поле imageUrl
                boardId: { type: 'number', description: 'ID доски' }, // Поле boardId
                file: {
                    type: 'string',
                    format: 'binary', // Указываем, что это бинарный файл
                    description: 'Файл изображения (только .jpg или .png)', // Описание файла
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async create(
        @Body() createImageDto: CreateImageDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10000000 }),
                    new FileTypeValidator({
                        fileType: new RegExp(/image\/(jpg|png)/g),
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ): Promise<void> {
        await this.createImageUseCase.createImage(
            createImageDto,
            file.filename,
        );
    }

    @Post('time')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: MulterStorageConfig,
        }),
    )
    @ApiOperation({ summary: 'Create a new image.' })
    @ApiResponse({
        status: 201,
        description: 'Image created',
    })
    @ApiBody({
        description: 'DTO для создания фото с файлом',
        schema: {
            type: 'object',
            properties: {
                title: { type: 'string', description: 'Название записи' }, // Поле title
                description: {
                    type: 'string',
                    description: 'Описание записи',
                    nullable: true,
                }, // Поле description
                imageUrl: { type: 'string', description: 'URL изображения' }, // Поле imageUrl
                boardId: { type: 'number', description: 'ID доски' }, // Поле boardId
                publishedAt: {
                    type: 'timestamp',
                    format: 'timestamp',
                    description: 'Дата публикации',
                },
                file: {
                    type: 'string',
                    format: 'binary', // Указываем, что это бинарный файл
                    description: 'Файл изображения (только .jpg или .png)', // Описание файла
                },
            },
        },
    })
    @ApiResponse({ status: 400, description: 'Invalid request' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async createImageTime(
        @Body() createImageTimeDto: CreateImageTimeDto,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 10000000 }),
                    new FileTypeValidator({
                        fileType: new RegExp(/image\/(jpg|png)/g),
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ): Promise<void> {
        await this.createImageUseCase.createImageTime(
            createImageTimeDto,
            file.filename,
        );
    }

    @Get()
    @ApiOperation({ summary: 'Get all images' })
    @ApiResponse({
        status: 200,
        type: [ImageModel],
        description: 'Authentication was successful',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    async getImages(
        @GetCurrentUser() userToken: JwtPayloadDto,
    ): Promise<ImageModel[]> {
        return await this.getImagesUseCase.getAllByUserId(userToken.userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get one image' })
    @ApiParam({
        name: 'id',
        type: Number,
        description: 'Id image',
    })
    @ApiResponse({
        status: 200,
        type: ImageModel,
        description: 'Authentication was successful',
    })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @ApiResponse({ status: 404, description: 'Photo not found.' })
    async getById(
        @Param('id', ParseIntPipe) imageId: number,
    ): Promise<ImageModel> {
        return await this.getImageUseCase.getById(imageId);
    }
}
