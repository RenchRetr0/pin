import { RequestCreateImageDto } from '@pin/domain/dto/image';

export abstract class ICreateImageUseCase {
    abstract createImage(
        userId: number,
        requestCreateImageDto: RequestCreateImageDto,
        imageName: string,
    ): Promise<void>;
}
