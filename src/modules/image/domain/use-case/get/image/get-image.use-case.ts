import { ImageNotFound } from '@image/domain/errors';
import { ImageModel } from '@image/domain/model';
import { IImageRepository } from '@image/domain/repository';
import { Inject, Injectable } from '@nestjs/common';
import { IGetImageUseCase } from './i-get-image.use-case';

@Injectable()
export class GetImageUseCase implements IGetImageUseCase {
    constructor(
        @Inject(IImageRepository)
        private readonly imageRepository: IImageRepository,
    ) {}

    async getById(imageId: number): Promise<ImageModel> {
        const imageModel = await this.imageRepository.findById(imageId);
        if (!imageModel) throw new ImageNotFound();
        else return imageModel;
    }

    async getWithUser(imageId: number): Promise<ImageModel> {
        const imageModel = await this.imageRepository.findByIdWithUser(imageId);
        if (!imageModel) throw new ImageNotFound();
        else return imageModel;
    }
}
