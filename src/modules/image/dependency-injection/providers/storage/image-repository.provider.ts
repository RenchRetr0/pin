import { Provider } from '@nestjs/common';
import { IImageRepository } from '@image/domain/repository';
import { ImageRepository } from '@image/storage/repository';

export const ImageRepositoryProvider: Provider = {
    provide: IImageRepository,
    useClass: ImageRepository,
};
