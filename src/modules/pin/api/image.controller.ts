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
import { FileInterceptor } from '@nestjs/platform-express';
import { ICreateImageUseCase } from '@pin/domain/use-case/image/create';
import { MulterStorageConfig } from '@config/multer-storage.config';
import { ImageModel } from '@pin/domain/model';
import { JwtPayloadDto } from '@auth/domain/dto';
import { GetCurrentUser } from '@common/decorators';
import { IGetImageUseCase } from '@pin/domain/use-case/image/get';
import { RequestCreateImageDto } from '@pin/domain/dto/image';

@Controller('image')
export class ImageController {
    constructor(
        @Inject(ICreateImageUseCase)
        private readonly createImageUseCase: ICreateImageUseCase,
        @Inject(IGetImageUseCase)
        private readonly getImageUseCase: IGetImageUseCase,
    ) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: MulterStorageConfig,
        }),
    )
    async createImage(
        @GetCurrentUser() userToken: JwtPayloadDto,
        @Body() requestCreateImageDto: RequestCreateImageDto,
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
            userToken.userId,
            requestCreateImageDto,
            file.filename,
        );
    }

    @Get(':id')
    async getImage(
        @Param('id', ParseIntPipe) imageId: number,
    ): Promise<ImageModel | null> {
        return await this.getImageUseCase.getById(imageId);
    }
}
