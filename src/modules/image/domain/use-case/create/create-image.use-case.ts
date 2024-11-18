import { Inject, Injectable } from '@nestjs/common';
import {
    CreateImageDto,
    CreateImageTimeDto,
    ReqCreateImageDto,
    ReqCreateImageTimeDto,
} from '@image/domain/dto';
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
        reqCreateImageDto: ReqCreateImageDto,
        imageName: string,
    ): Promise<void> {
        console.log('File name in use-case: ', imageName);
        const boardId: number = Number(reqCreateImageDto.boardId);
        await this.getBoardUseCase.getById(boardId);

        let createImageDto: CreateImageDto = {
            title: reqCreateImageDto.title,
            description: reqCreateImageDto.description,
            boardId: boardId,
            imageUrl: `${this.configService.get<string>(
                'SERVER_URL',
            )}/uploads/${imageName}`,
        };
        console.log(createImageDto.imageUrl);

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
        reqCreateImageTimeDto: ReqCreateImageTimeDto,
        imageName: string,
    ): Promise<void> {
        const boardId: number = Number(reqCreateImageTimeDto.boardId);

        await this.getBoardUseCase.getById(boardId);

        let createImageTimeDto: CreateImageTimeDto = {
            title: reqCreateImageTimeDto.title,
            description: reqCreateImageTimeDto.description,
            boardId: boardId,
            publishedAt: reqCreateImageTimeDto.publishedAt,
            imageUrl: `${this.configService.get<string>(
                'SERVER_URL',
            )}/uploads/${imageName}`,
            isStatus: false,
        };
        try {
            await this.imageRepository.create(createImageTimeDto);
        } catch (error) {
            console.error(error.message);
            throw new ImageBarRequest();
        }
    }
}
