import { Inject, Injectable } from '@nestjs/common';
import { ImageModel } from '@image/domain/model';
import { IImageRepository } from '@image/domain/repository';
import { IGetImagesUseCase } from './i-get-image.use-case';

@Injectable()
export class GetImagesUseCase implements IGetImagesUseCase {
    constructor(
        @Inject(IImageRepository)
        private readonly imageRepository: IImageRepository,
    ) {}

    async getAllByUserId(userId: number): Promise<ImageModel[]> {
        return await this.imageRepository.findAllByUserId(userId);
    }

    async getAllSendImageTime(): Promise<ImageModel[]> {
        return await this.imageRepository.findAllSendImageTime();
    }
}
