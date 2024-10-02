import { Inject, Injectable } from '@nestjs/common';
import { ICreateImageUseCase } from './i-create-image.use-case';
import { IImageRepository } from '@pin/domain/repository';
import { CreateImageDto } from '@pin/domain/dto';

@Injectable()
export class CreateImageUseCase implements ICreateImageUseCase {
    constructor(
        @Inject(IImageRepository)
        private readonly imageRepository: IImageRepository,
    ) {}

    async createImage(
        userId: number,
        createImageDto: CreateImageDto,
        imageName: string,
    ): Promise<void> {
        try {
            createImageDto.imageUrl = `http://localhost:5000/uploads/${imageName}`;
            createImageDto.userId = userId;
            await this.imageRepository.create(createImageDto);
        } catch (error) {
            console.error(error.message);
        }
    }
}
