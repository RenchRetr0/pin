import { CreateImageDto } from '@pin/domain/dto';

export abstract class ICreateImageUseCase {
    abstract createImage(
        userId: number,
        createImageDto: CreateImageDto,
        imageName: string,
    ): Promise<void>;
}
