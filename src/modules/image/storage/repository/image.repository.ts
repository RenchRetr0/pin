import { IImageRepository } from '@image/domain/repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageEntity } from '../entity';
import { LessThan, Repository } from 'typeorm';
import { ImageModel } from '@image/domain/model';
import { CreateImageDto } from '@image/domain/dto';

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
                description: imageEntity.description,
                imageUrl: imageEntity.imageUrl,
                boardId: imageEntity.boardId,
                publishedAt: imageEntity.publishedAt ?? null,
                isStatus: imageEntity.isStatus,
                errorMessage: imageEntity.errorMessage ?? null,
            };
            return imageModel;
        }
    }

    async findByIdWithUser(imageId: number): Promise<ImageModel | null> {
        const imageEntity = await this.imageRepository.findOne({
            where: {
                id: imageId,
            },
            relations: {
                board: {
                    user: true,
                },
            },
        });
        if (!imageEntity) return null;
        else {
            const imageModel: ImageModel = {
                id: imageEntity.id,
                title: imageEntity.title,
                description: imageEntity.description,
                imageUrl: imageEntity.imageUrl,
                boardId: imageEntity.boardId,
                board: imageEntity.board,
                publishedAt: imageEntity.publishedAt ?? null,
                isStatus: imageEntity.isStatus,
                errorMessage: imageEntity.errorMessage ?? null,
            };
            return imageModel;
        }
    }

    async findAllByUserId(userId: number): Promise<ImageModel[]> {
        const imagesEntity = await this.imageRepository.find({
            where: {
                board: {
                    userId: userId,
                },
            },
            relations: {
                board: true,
            },
            order: {
                id: 'DESC',
            },
        });
        const imagesModel: ImageModel[] = imagesEntity.map((imageEntity) => ({
            id: imageEntity.id,
            title: imageEntity.title,
            description: imageEntity.description,
            imageUrl: imageEntity.imageUrl,
            boardId: imageEntity.boardId,
            publishedAt: imageEntity.publishedAt ?? null,
            isStatus: imageEntity.isStatus,
            errorMessage: imageEntity.errorMessage ?? null,
        }));
        return imagesModel;
    }

    async findAllSendImageTime(): Promise<ImageModel[]> {
        const imagesEntity = await this.imageRepository.find({
            where: {
                isStatus: false,
                publishedAt: LessThan(new Date()),
            },
            order: {
                id: 'DESC',
            },
        });
        const imagesModel: ImageModel[] = imagesEntity.map((imageEntity) => ({
            id: imageEntity.id,
            title: imageEntity.title,
            description: imageEntity.description,
            imageUrl: imageEntity.imageUrl,
            boardId: imageEntity.boardId,
            publishedAt: imageEntity.publishedAt ?? null,
            isStatus: imageEntity.isStatus,
            errorMessage: imageEntity.errorMessage ?? null,
        }));
        return imagesModel;
    }

    async create(createImageDto: CreateImageDto): Promise<ImageModel> {
        const imageEntity = await this.imageRepository.save(createImageDto);
        const imageModel: ImageModel = {
            id: imageEntity.id,
            title: imageEntity.title,
            description: imageEntity.description,
            imageUrl: imageEntity.imageUrl,
            boardId: imageEntity.boardId,
            publishedAt: imageEntity.publishedAt ?? null,
            isStatus: imageEntity.isStatus,
            errorMessage: imageEntity.errorMessage ?? null,
        };
        return imageModel;
    }

    async update(imageId: number, imageModel: ImageModel): Promise<void> {
        await this.imageRepository.update({ id: imageId }, imageModel);
    }
}
