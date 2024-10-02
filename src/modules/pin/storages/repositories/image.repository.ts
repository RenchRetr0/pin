import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IImageRepository } from '@pin/domain/repositories';
import { ImageEntity } from '../entities';
import { Repository } from 'typeorm';
import { ImageModel } from '@pin/domain/model';
import { CreateImageDto } from '@pin/domain/dto/image';

@Injectable()
export class ImageRepository implements IImageRepository {
    constructor(
        @InjectRepository(ImageEntity)
        private readonly imageRepository: Repository<ImageEntity>,
    ) {}

    async findById(imageId: number): Promise<ImageModel | null> {
        const imageEntity = await this.imageRepository.findOne({
            where: {
                id: imageId,
            },
        });
        if (!imageEntity) return null;
        else {
            const imageModel: ImageModel = {
                id: imageEntity.id,
                title: imageEntity.title,
                description: imageEntity.description ?? null,
                imageUrl: imageEntity.imageUrl,
            };
            return imageModel;
        }
    }

    async create(createImageDto: CreateImageDto): Promise<ImageModel> {
        const imageEntity = await this.imageRepository.save(createImageDto);
        const imageModel: ImageModel = {
            id: imageEntity.id,
            title: imageEntity.title,
            description: imageEntity.description ?? null,
            imageUrl: imageEntity.imageUrl,
        };
        return imageModel;
    }
}
