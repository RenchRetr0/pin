import { Inject, Injectable } from '@nestjs/common';
import { IGetImageUseCase } from './i-get-image.use-case';
import { IImageRepository } from '@pin/domain/repository';
import { ImageModel } from '@pin/domain/model';

@Injectable()
export class GetImageUseCase implements IGetImageUseCase {
    constructor(
        @Inject(IImageRepository)
        private readonly imageRepository: IImageRepository,
    ) {}

    async getById(imageId: number): Promise<ImageModel | null> {
        const imageModel = await this.imageRepository.findById(imageId);
        if (!imageId) return null;
        else return imageModel;
    }
}
