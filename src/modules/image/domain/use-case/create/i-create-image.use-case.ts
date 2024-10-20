import { CreateImageDto, CreateImageTimeDto } from '@image/domain/dto';

export abstract class ICreateImageUseCase {
    abstract createImage(
        createImageDto: CreateImageDto,
        imageName: string,
    ): Promise<void>;
    abstract createImageTime(
        createImageTimeDto: CreateImageTimeDto,
        imageName: string,
    ): Promise<void>;
}
