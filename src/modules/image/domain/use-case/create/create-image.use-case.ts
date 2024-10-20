import { Inject, Injectable } from '@nestjs/common';
import { CreateImageDto, CreateImageTimeDto } from '@image/domain/dto';
import { IImageRepository } from '@image/domain/repository';
import { IGetBoardUseCase } from '@board/domain/use-case/get/board';
import { ConfigService } from '@nestjs/config';
import { ICreateImageUseCase } from './i-create-image.use-case';
import { ImageBarRequest } from '@image/domain/errors';
import { IRequestPinUseCase } from '../request-pint';

@Injectable()
export class CreateImageUseCase implements ICreateImageUseCase {
    constructor(
        @Inject(IImageRepository)
        private readonly imageRepository: IImageRepository,
        @Inject(IGetBoardUseCase)
        private readonly getBoardUseCase: IGetBoardUseCase,
        @Inject(ConfigService)
        private readonly configService: ConfigService,
        @Inject(IRequestPinUseCase)
        private readonly requestPinUseCase: IRequestPinUseCase,
    ) {}

    async createImage(
        createImageDto: CreateImageDto,
        imageName: string,
    ): Promise<void> {
        await this.getBoardUseCase.getById(createImageDto.boardId);

        createImageDto.imageUrl = `${this.configService.get<string>(
            'SERVER_URL',
        )}/uploads/${imageName}`;

        try {
            const imageModel = await this.imageRepository.create(
                createImageDto,
            );
            await this.requestPinUseCase.requestSave(imageModel.id);
        } catch (error) {
            console.error(error.message);
            throw new ImageBarRequest();
        }
    }

    async createImageTime(
        createImageTimeDto: CreateImageTimeDto,
        imageName: string,
    ): Promise<void> {
        await this.getBoardUseCase.getById(createImageTimeDto.boardId);
        createImageTimeDto.isStatus = false;
        createImageTimeDto.imageUrl = `${this.configService.get<string>(
            'SERVER_URL',
        )}/uploads/${imageName}`;
        try {
            await this.imageRepository.create(createImageTimeDto);
        } catch (error) {
            console.error(error.message);
            throw new ImageBarRequest();
        }
    }
}
