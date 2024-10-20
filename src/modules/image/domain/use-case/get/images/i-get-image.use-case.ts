import { ImageModel } from '@image/domain/model';

export abstract class IGetImagesUseCase {
    abstract getAllByUserId(userId: number): Promise<ImageModel[]>;
    abstract getAllSendImageTime(): Promise<ImageModel[]>;
}
