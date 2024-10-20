import { IImageRepository } from '@image/domain/repository';
import { Inject, Injectable } from '@nestjs/common';
import { IGetImageUseCase } from '../get/image';
import { ImageBarRequest } from '@image/domain/errors';
import { UpdateImageStatus } from '@image/domain/dto';
import { ImageModel } from '@image/domain/model';
import { IUpdateImageUseCase } from './i-update-image.use-case';

@Injectable()
export class UpdateImageUseCase implements IUpdateImageUseCase {
    constructor(
        @Inject(IImageRepository)
        private readonly imageRepository: IImageRepository,
        @Inject(IGetImageUseCase)
        private readonly getImageUseCase: IGetImageUseCase,
    ) {}

    async updateStatus(
        imageId: number,
        updateImageStatus: UpdateImageStatus,
    ): Promise<void> {
        const oldImageModel = await this.getImageUseCase.getById(imageId);
        try {
            const newImageModel: ImageModel = {
                id: oldImageModel.id,
                title: oldImageModel.title,
                description: oldImageModel.description,
                imageUrl: oldImageModel.imageUrl,
                boardId: oldImageModel.boardId,
                publishedAt: oldImageModel.publishedAt,
                isStatus: updateImageStatus.isStatus ?? oldImageModel.isStatus,
                errorMessage:
                    updateImageStatus.errorMessage ??
                    oldImageModel.errorMessage,
            };
            await this.imageRepository.update(imageId, newImageModel);
        } catch (error) {
            console.error(error.message);
            throw new ImageBarRequest();
        }
    }
}
