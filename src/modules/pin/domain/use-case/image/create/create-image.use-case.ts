import { Inject, Injectable } from '@nestjs/common';
import { ICreateImageUseCase } from './i-create-image.use-case';
import { IImageRepository } from '@pin/domain/repositories';
import { CreateImageDto, RequestCreateImageDto } from '@pin/domain/dto/image';
import { IGetUserUseCase } from '@user/domain/use-case/get';
import { CreatePinDto } from '@pin/domain/dto/pin';

@Injectable()
export class CreateImageUseCase implements ICreateImageUseCase {
    constructor(
        @Inject(IImageRepository)
        private readonly imageRepository: IImageRepository,
        @Inject(IGetUserUseCase)
        private readonly getUserUseCase: IGetUserUseCase,
    ) {}

    async createImage(
        userId: number,
        requestCreateImageDto: RequestCreateImageDto,
        imageName: string,
    ): Promise<void> {
        const createPinDto: CreatePinDto = {
            title: requestCreateImageDto.title,
            boardId: requestCreateImageDto.boardId,
            imageUrl: `http://localhost:5000/uploads/${imageName}`,
            description: requestCreateImageDto.description ?? null,
        };
        await this.createPin(userId, createPinDto);

        try {
            const createImageDto: CreateImageDto = {
                title: requestCreateImageDto.title,
                description: requestCreateImageDto.description ?? null,
                imageUrl: `http://localhost:5000/uploads/${imageName}`,
                userId: userId,
            };
            await this.imageRepository.create(createImageDto);
        } catch (error) {
            console.error(error.message);
        }
    }

    private async createPin(
        userId: number,
        createPinDto: CreatePinDto,
    ): Promise<void> {
        try {
            const userModel = await this.getUserUseCase.getById(userId);
            const bodyString = {
                title: createPinDto.title,
                description: createPinDto.description ?? null,
                board_id: createPinDto.boardId,
                media_source: {
                    source_type: 'image_url',
                    url: createPinDto.imageUrl,
                },
            };
            const result = await fetch(
                'https://api-sandbox.pinterest.com/v5/pins',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${userModel.accessToken}`,
                    },
                    body: JSON.stringify(bodyString),
                },
            );
        } catch (error) {
            console.error(error);
        }
    }
}
