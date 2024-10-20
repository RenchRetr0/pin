import { UpdateImageStatus } from '@image/domain/dto';

export abstract class IUpdateImageUseCase {
    abstract updateStatus(
        imageId: number,
        updateImageStatus: UpdateImageStatus,
    ): Promise<void>;
}
