import { ImageModel } from '@image/domain/model';

export abstract class IGetImageUseCase {
    abstract getById(imageId: number): Promise<ImageModel>;
    abstract getWithUser(imageId: number): Promise<ImageModel>;
}
